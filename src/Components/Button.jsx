export default function Button({
  children,
  type = "button",
  bgColor = "bg-[#183a35] hover:bg-[#24554c]",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`rounded-lg px-4 py-2 font-semibold transition-colors focus-visible:outline-offset-2 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
