export default function IconStreetView({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="4" />
      <path d="M5.5 21.5a8.38 8.38 0 0 1 13 0" />
      <path d="M2 12h20" />
      <path d="M12 2v20" />
    </svg>
  );
}