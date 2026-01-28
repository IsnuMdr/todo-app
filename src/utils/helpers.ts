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
 * Get status color untuk MUI
 * @param {string} status - Todo status
 * @returns {string} Color name
 */
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: "warning",
    in_progress: "info",
    completed: "success",
  };
  return colors[status] || "default";
};

/**
 * Get priority color untuk MUI
 * @param {string} priority - Todo priority
 * @returns {string} Color name
 */
export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    low: "success",
    medium: "warning",
    high: "error",
  };
  return colors[priority] || "default";
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
export const getInitials = (name: string): string => {
  if (!name) return "";

  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
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
