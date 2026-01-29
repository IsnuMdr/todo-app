export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Format tanggal ke format yang lebih readable
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString("id-ID", options);
};

/**
 * Format tanggal ke format yang lebih singkat
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDateShort = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("id-ID", options);
};

/**
 * Get relative time (e.g., "2 jam yang lalu")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time
 */
export const getRelativeTime = (dateString: string): string => {
  if (!dateString) return "";

  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Baru saja";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} hari yang lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan yang lalu`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} tahun yang lalu`;
};

/**
 * Truncate text dengan ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};


/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string}
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Get initials dari nama
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (email: string): string => {
  // get from email
  if (!email) return "";
  const namePart = email.split("@")[0];
  const parts = namePart.split(".");
  return parts.map(part => part.charAt(0).toUpperCase()).join("").slice(0, 2);
};

/**
 * Check if date is overdue
 * @param {string} dateString - ISO date string
 * @returns {boolean}
 */
export const isOverdue = (dateString: string): boolean => {
  if (!dateString) return false;
  const dueDate: Date = new Date(dateString);
  const now: Date = new Date();
  return dueDate < now;
};
