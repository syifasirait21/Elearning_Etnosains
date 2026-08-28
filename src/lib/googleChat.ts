// Google Chat API client library for AI Studio E-Learning

export interface GoogleUser {
  id?: string;
  name: string;
  email: string;
  picture?: string;
}

export interface ChatSpace {
  name: string; // e.g. "spaces/AAAAAAAAAAA"
  displayName?: string;
  spaceType?: 'SPACE' | 'GROUP_CHAT' | 'DIRECT_MESSAGE';
  spaceThreadingState?: string;
  spaceDetails?: {
    description?: string;
    guidelines?: string;
  };
}

export interface ChatMessage {
  name: string; // e.g. "spaces/AAAAAAAAAAA/messages/BBBBBBBBBBB"
  text: string;
  createTime: string;
  sender?: {
    name?: string;
    displayName?: string;
    avatarUrl?: string;
    type?: string;
  };
  thread?: {
    name?: string;
  };
}

const CHAT_SCOPES = [
  'https://www.googleapis.com/auth/chat.spaces.readonly',
  'https://www.googleapis.com/auth/chat.spaces',
  'https://www.googleapis.com/auth/chat.messages',
  'https://www.googleapis.com/auth/chat.messages.readonly',
  'https://www.googleapis.com/auth/chat.messages.create',
  'https://www.googleapis.com/auth/chat.memberships.readonly',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

const STORAGE_KEY_TOKEN = 'gchat_access_token';
const STORAGE_KEY_EXPIRY = 'gchat_token_expiry';
const STORAGE_KEY_USER = 'gchat_user_profile';

export class GoogleChatService {
  private static tokenClient: any = null;

  static getSavedToken(): string | null {
    try {
      const token = sessionStorage.getItem(STORAGE_KEY_TOKEN) || localStorage.getItem(STORAGE_KEY_TOKEN);
      const expiry = sessionStorage.getItem(STORAGE_KEY_EXPIRY) || localStorage.getItem(STORAGE_KEY_EXPIRY);
      if (token && expiry) {
        const expiresAt = parseInt(expiry, 10);
        if (Date.now() < expiresAt) {
          return token;
        }
      }
    } catch (e) {
      console.warn('Error reading stored token', e);
    }
    return null;
  }

  static getSavedUser(): GoogleUser | null {
    try {
      const user = sessionStorage.getItem(STORAGE_KEY_USER) || localStorage.getItem(STORAGE_KEY_USER);
      if (user) {
        return JSON.parse(user);
      }
    } catch (e) {
      console.warn('Error reading stored user', e);
    }
    return null;
  }

  static saveToken(token: string, expiresInSeconds: number = 3600, user?: GoogleUser) {
    try {
      const expiresAt = Date.now() + expiresInSeconds * 1000;
      sessionStorage.setItem(STORAGE_KEY_TOKEN, token);
      sessionStorage.setItem(STORAGE_KEY_EXPIRY, expiresAt.toString());
      if (user) {
        sessionStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      }
    } catch (e) {
      console.warn('Error saving token', e);
    }
  }

  static clearAuth() {
    try {
      sessionStorage.removeItem(STORAGE_KEY_TOKEN);
      sessionStorage.removeItem(STORAGE_KEY_EXPIRY);
      sessionStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      localStorage.removeItem(STORAGE_KEY_EXPIRY);
      localStorage.removeItem(STORAGE_KEY_USER);
    } catch (e) {
      console.warn('Error clearing auth', e);
    }
  }

  static async requestToken(clientId?: string): Promise<{ token: string; user?: GoogleUser }> {
    return new Promise((resolve, reject) => {
      const effectiveClientId = clientId || (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

      if (!effectiveClientId) {
        reject(
          new Error(
            'Google OAuth Client ID belum dikonfigurasi. Silakan masukkan Client ID Google Anda atau konfigurasi VITE_GOOGLE_CLIENT_ID di berkas environment.'
          )
        );
        return;
      }

      const google = (window as any).google;
      if (!google || !google.accounts || !google.accounts.oauth2) {
        reject(
          new Error(
            'Google Identity Services SDK sedang dimuat atau diblokir. Pastikan koneksi internet aktif dan coba lagi.'
          )
        );
        return;
      }

      try {
        const tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: effectiveClientId,
          scope: CHAT_SCOPES.join(' '),
          callback: async (response: any) => {
            if (response.error) {
              reject(new Error(response.error_description || response.error));
              return;
            }
            if (response.access_token) {
              let userProfile: GoogleUser | undefined;
              try {
                userProfile = await GoogleChatService.fetchUserProfile(response.access_token);
              } catch (e) {
                console.warn('Could not fetch user profile', e);
              }

              GoogleChatService.saveToken(
                response.access_token,
                response.expires_in || 3600,
                userProfile
              );

              resolve({ token: response.access_token, user: userProfile });
            } else {
              reject(new Error('Tidak ada access token yang diterima dari Google.'));
            }
          },
        });

        tokenClient.requestAccessToken({ prompt: 'consent' });
      } catch (err: any) {
        reject(err);
      }
    });
  }

  static async fetchUserProfile(accessToken: string): Promise<GoogleUser> {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Gagal mengambil profil pengguna: ${res.statusText}`);
    }

    const data = await res.json();
    return {
      id: data.sub,
      name: data.name || data.email,
      email: data.email,
      picture: data.picture,
    };
  }

  static async listSpaces(accessToken: string): Promise<ChatSpace[]> {
    const res = await fetch('https://chat.googleapis.com/v1/spaces?pageSize=50', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      const message = errorJson.error?.message || res.statusText;
      throw new Error(`Gagal memuat daftar Google Chat Spaces: ${message}`);
    }

    const data = await res.json();
    return data.spaces || [];
  }

  static async createSpace(
    accessToken: string,
    displayName: string,
    spaceType: 'SPACE' | 'GROUP_CHAT' = 'SPACE'
  ): Promise<ChatSpace> {
    const res = await fetch('https://chat.googleapis.com/v1/spaces', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayName,
        spaceType,
        spaceDetails: {
          description: 'Ruang diskusi materi Biologi Etnosains Rumah Melayu Langkat',
        },
      }),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      const message = errorJson.error?.message || res.statusText;
      throw new Error(`Gagal membuat Space baru: ${message}`);
    }

    return await res.json();
  }

  static async listMessages(
    accessToken: string,
    spaceName: string,
    pageSize: number = 40
  ): Promise<ChatMessage[]> {
    // Note: spaceName format is "spaces/XXXXXXXX"
    const url = `https://chat.googleapis.com/v1/${spaceName}/messages?pageSize=${pageSize}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      const message = errorJson.error?.message || res.statusText;
      throw new Error(`Gagal memuat pesan dari space: ${message}`);
    }

    const data = await res.json();
    // Return messages in chronological order if possible
    const msgs: ChatMessage[] = data.messages || [];
    return msgs.sort((a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime());
  }

  static async sendMessage(
    accessToken: string,
    spaceName: string,
    text: string
  ): Promise<ChatMessage> {
    const url = `https://chat.googleapis.com/v1/${spaceName}/messages`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      const message = errorJson.error?.message || res.statusText;
      throw new Error(`Gagal mengirim pesan ke Google Chat: ${message}`);
    }

    return await res.json();
  }
}
