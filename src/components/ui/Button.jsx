export default function ReusableButton({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) {
  const baseStyles =
    "py-4 w-full uppercase font-semibold cursor-pointer rounded-full transition-all duration-300";

  const variants = {
    primary: "bg-black hover:bg-gray-800 text-white",
    secondary: "bg-white hover:text-gray-400 text-black border-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
