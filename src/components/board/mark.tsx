export function DieMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect x="5" y="5" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 11.5h22M5 20.5h22M11.5 5v22M20.5 5v22" stroke="currentColor" strokeWidth="1" />
      <rect x="13.5" y="13.5" width="5" height="5" fill="currentColor" />
    </svg>
  );
}
