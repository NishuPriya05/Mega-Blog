function Logo({ width = "100px" }) {
  return (
    <svg
      aria-label="MegaBlog"
      className="block shrink-0"
      height={width}
      role="img"
      viewBox="0 0 48 48"
      width={width}
    >
      <rect width="48" height="48" rx="14" fill="#183a35" />
      <path
        d="M11 15.5c4.9-2.3 9.3-1.9 13 1v17.7c-3.7-2.8-8.1-3.2-13-1V15.5Zm26 0c-4.9-2.3-9.3-1.9-13 1v17.7c3.7-2.8 8.1-3.2 13-1V15.5Z"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path d="M32.5 8.5h7v12l-3.5-2.2-3.5 2.2v-12Z" fill="#f18a68" />
    </svg>
  );
}

export default Logo;
