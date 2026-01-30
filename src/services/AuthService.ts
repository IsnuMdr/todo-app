import type { User } from "@types";
import storageService from "./StorageService";
import { MESSAGES, STORAGE_KEYS } from "@constants";
import { supabase } from "./SupabaseService";

class AuthService {
  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Object|null} User object atau null jika gagal
   */
  loginOrRegister(
    email: string,
    password: string,
  ): {
    success: boolean;
    user?: Omit<User, "password"> | null;
    isNewUser?: boolean;
    error?: string;
  } {
    const users: User[] = storageService.get(STORAGE_KEYS.USER) || [];
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      if (existingUser.password === password) {
        const { password: _, ...userWithoutPassword } = existingUser;
        const token = this.generateToken();
        storageService.set(STORAGE_KEYS.AUTH_TOKEN, {
          token,
          user: userWithoutPassword,
        });
        return {
          success: true,
          user: userWithoutPassword,
          isNewUser: false,
        };
      } else {
        return {
          success: false,
          error: MESSAGES.LOGIN_ERROR,
        };
      }
    } else {
      const newUser = {
        id: this.generateId(),
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      storageService.set(STORAGE_KEYS.USER, users);

      const { password: _, ...userWithoutPassword } = newUser;
      const token = this.generateToken();
      storageService.set(STORAGE_KEYS.AUTH_TOKEN, {
        token,
        user: userWithoutPassword,
      });

      return {
        success: true,
        user: userWithoutPassword,
        isNewUser: true,
      };
    }
  }

  /**
   * Login dengan Google
   */
  async loginWithGoogle(): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/login',
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async syncSupabaseSession(): Promise<{
    success: boolean;
    user?: Omit<User, "password"> | null;
    error?: string;
  }> {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session && session.user) {
        const users: User[] = storageService.get(STORAGE_KEYS.USER) || [];
        const existingUserIndex = users.findIndex((u) => u.email === session.user.email);

        const userData: User = {
          id: session.user.id,
          email: session.user.email || '',
          password: '',
          createdAt: session.user.created_at || new Date().toISOString(),
        };

        if (existingUserIndex >= 0) {
          users[existingUserIndex] = userData;
        } else {
          users.push(userData);
        }

        storageService.set(STORAGE_KEYS.USER, users);

        const { password: _, ...userWithoutPassword } = userData;
        storageService.set(STORAGE_KEYS.AUTH_TOKEN, {
          token: session.access_token,
          user: userWithoutPassword,
        });

        return { success: true, user: userWithoutPassword };
      }

      return { success: false };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  setupAuthListener(callback: (user: Omit<User, "password"> | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Simpan ke todo_app_user
        const users: User[] = storageService.get(STORAGE_KEYS.USER) || [];
        const existingUserIndex = users.findIndex((u) => u.email === session.user.email);

        const userData: User = {
          id: session.user.id,
          email: session.user.email || '',
          password: '',
          createdAt: session.user.created_at || new Date().toISOString(),
        };

        if (existingUserIndex >= 0) {
          users[existingUserIndex] = userData;
        } else {
          users.push(userData);
        }

        storageService.set(STORAGE_KEYS.USER, users);

        const { password: _, ...userWithoutPassword } = userData;
        storageService.set(STORAGE_KEYS.AUTH_TOKEN, {
          token: session.access_token,
          user: userWithoutPassword,
        });

        callback(userWithoutPassword);
      } else if (event === 'SIGNED_OUT') {
        storageService.remove(STORAGE_KEYS.AUTH_TOKEN);
        callback(null);
      }
    });
  }

  /**
   * Logout user
   */
  async logout() {
    await supabase.auth.signOut();
    storageService.remove(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Get current user
   */
  getCurrentUser(): Omit<User, "password"> | null {
    const authData = storageService.get(STORAGE_KEYS.AUTH_TOKEN);
    return authData ? authData.user : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return storageService.has(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Generate token sederhana
   */
  generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate ID unik
   */
  generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default new AuthService();