interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  title,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        bg-button-blue 
        text-white 
        text-3xl 
        p-2 
        rounded-lg
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
      `}
    >
      {title}
    </button>
  );
}
