class StorageService {
  set(key: string, value: any): boolean {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
      return false;
    }
  }

  get(key: string): any {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return null;
    }
  }

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
      return false;
    }
  }

  /**
   * Membersihkan semua data dari localStorage
   */
  clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
      return false;
    }
  }

  /**
   * Mengecek apakah key ada di localStorage
   * @param {string} key - Key untuk dicek
   * @returns {boolean}
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}

export default new StorageService();
