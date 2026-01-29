// Email Icon
export const MailIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

// Lock Icon
export const LockIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

// Eye Icon
export const EyeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

// Eye Off Icon
export const EyeOffIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

// Arrow Right Icon
export const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

// Check Circle Icon
export const CheckCircleIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

// Google Icon
export const GoogleIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

export const DashboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <mask
      id="mask0_24958_1566"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="1"
      y="0"
      width="18"
      height="19"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66675 0.833496H18.7499V18.7543H1.66675V0.833496Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_24958_1566)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4307 12.7429C12.434 12.7429 13.2507 13.5537 13.2507 14.5504V17.1137C13.2507 17.3279 13.4223 17.4995 13.6423 17.5045H15.2307C16.4823 17.5045 17.4998 16.4995 17.4998 15.2645V7.99454C17.494 7.56954 17.2915 7.16954 16.944 6.9037L11.4498 2.52204C10.7123 1.93787 9.68067 1.93787 8.94067 2.5237L3.484 6.90204C3.12317 7.1762 2.92067 7.5762 2.9165 8.0087V15.2645C2.9165 16.4995 3.934 17.5045 5.18567 17.5045H6.789C7.01484 17.5045 7.19817 17.3254 7.19817 17.1054C7.19817 17.057 7.204 17.0087 7.214 16.9629V14.5504C7.214 13.5595 8.02567 12.7495 9.0215 12.7429H11.4307ZM15.2307 18.7545H13.6273C12.709 18.7329 12.0007 18.012 12.0007 17.1137V14.5504C12.0007 14.2429 11.7448 13.9929 11.4307 13.9929H9.02567C8.71817 13.9945 8.464 14.2454 8.464 14.5504V17.1054C8.464 17.1679 8.45567 17.2279 8.43817 17.2845C8.34817 18.1095 7.64317 18.7545 6.789 18.7545H5.18567C3.24484 18.7545 1.6665 17.1887 1.6665 15.2645V8.00287C1.67484 7.17454 2.0565 6.4162 2.71567 5.91704L8.1615 1.5462C9.36067 0.596205 11.0315 0.596205 12.2282 1.54454L17.7132 5.91954C18.3573 6.41037 18.739 7.16704 18.7498 7.98537V15.2645C18.7498 17.1887 17.1715 18.7545 15.2307 18.7545Z"
        fill="#4F4F4F"
      />
    </g>
  </svg>
);

export const TodoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      d="M18.6398 4.5662L14.4966 0.646508C14.0559 0.229582 13.4791 0 12.8724 0H4.98438C3.68126 0 2.62109 1.06017 2.62109 2.36328V19.6367C2.62109 20.9398 3.68126 22 4.98438 22H17.0156C18.3187 22 19.3789 20.9398 19.3789 19.6367V6.28298C19.3789 5.63634 19.1095 5.01059 18.6398 4.5662ZM17.3878 5.15625H14.1797C14.0612 5.15625 13.9648 5.05987 13.9648 4.94141V1.91795L17.3878 5.15625ZM17.0156 20.7109H4.98438C4.39205 20.7109 3.91016 20.229 3.91016 19.6367V2.36328C3.91016 1.77096 4.39205 1.28906 4.98438 1.28906H12.6758V4.94141C12.6758 5.77066 13.3504 6.44531 14.1797 6.44531H18.0898V19.6367C18.0898 20.229 17.6079 20.7109 17.0156 20.7109Z"
      fill="#4F4F4F"
    />
    <path
      d="M15.5977 8.59375H6.14453C5.78858 8.59375 5.5 8.88233 5.5 9.23828C5.5 9.59423 5.78858 9.88281 6.14453 9.88281H15.5977C15.9536 9.88281 16.2422 9.59423 16.2422 9.23828C16.2422 8.88233 15.9536 8.59375 15.5977 8.59375Z"
      fill="#4F4F4F"
    />
    <path
      d="M15.5977 12.0312H6.14453C5.78858 12.0312 5.5 12.3198 5.5 12.6758C5.5 13.0317 5.78858 13.3203 6.14453 13.3203H15.5977C15.9536 13.3203 16.2422 13.0317 16.2422 12.6758C16.2422 12.3198 15.9536 12.0312 15.5977 12.0312Z"
      fill="#4F4F4F"
    />
    <path
      d="M9.26922 15.4688H6.14453C5.78858 15.4688 5.5 15.7573 5.5 16.1133C5.5 16.4692 5.78858 16.7578 6.14453 16.7578H9.26922C9.62517 16.7578 9.91375 16.4692 9.91375 16.1133C9.91375 15.7573 9.62517 15.4688 9.26922 15.4688Z"
      fill="#4F4F4F"
    />
  </svg>
);
