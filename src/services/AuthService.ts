import type { User } from "@types";
import storageService from "./StorageService";
import { MESSAGES, STORAGE_KEYS } from "@constants";

/**
 * Service untuk mengelola autentikasi
 */
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
 * @param {Object} googleUser - Data dari Google
 * @returns {Object} { success, user, isNewUser }
 */
  loginWithGoogle(googleUser: { email: string; name: string; picture: string; }): {
    success: boolean;
    user: Omit<User, "password">;
    isNewUser: boolean;
  } {
    const { email, name, picture } = googleUser;
    const users: User[] = storageService.get(STORAGE_KEYS.USER) || [];
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      const { password, ...userWithoutPassword } = existingUser;
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
      // User baru, auto-register
      const newUser = {
        id: this.generateId(),
        email,
        name,
        picture, // Google profile picture
        password: '', // No password for Google users
        provider: 'google',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      storageService.set(STORAGE_KEYS.USER, users);

      const { password, ...userWithoutPassword } = newUser;
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
   * Logout user
   */
  logout() {
    storageService.remove(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Get current user
   * @returns {Object|null}
   */
  getCurrentUser(): Omit<User, "password"> | null {
    const authData = storageService.get(STORAGE_KEYS.AUTH_TOKEN);
    return authData ? authData.user : null;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return storageService.has(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Generate token sederhana (untuk demo purposes)
   * @returns {string}
   */
  generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate ID unik
   * @returns {string}
   */
  generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default new AuthService();
