import { LoadingOutlined } from "@ant-design/icons";

export default function ReusableButton({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
}) {
  const isDisabled = disabled || loading;

  const baseStyles = `
    py-2 sm:py-2 md:py-2 
    px-4 
    text-sm sm:text-base md:text-lg 
    uppercase font-semibold 
    rounded-full 
    transition-all duration-300 
    flex justify-center items-center gap-2
    ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
  `;

  const variants = {
    primary: isDisabled
      ? "bg-white border border-black text-gray-400"
      : "bg-black hover:bg-gray-800 text-white",
    secondary: isDisabled
      ? "bg-white border border-gray-300 text-gray-400"
      : "bg-white hover:text-gray-400 text-black border-2 border-black",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isDisabled}
    >
      {loading ? <LoadingOutlined spin className="text-lg" /> : children}
    </button>
  );
}
