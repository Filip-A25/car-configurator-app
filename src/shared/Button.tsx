import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: "primary" | "secondary";
  imgSrc?: string;
  imgAlt?: string;
}

export default function Button({
  label,
  variant,
  imgSrc,
  imgAlt,
  ...rest
}: ButtonProps) {
  const className =
    variant === "primary"
      ? "bg-button-purple bottom-[180px] h-[48px] sm:h-[44px] w-full mb-4 text-basic-white hover:brightness-[110%] transition-all delay-100 ease-in-out"
      : "flex justify-center items-center h-[48px] sm:h-[44px] w-full mb-4 text-button-purple border hover:brightness-[110%] transition-all delay-100 ease-in-out";

  return (
    <button {...rest} className={className}>
      {imgSrc && (
        <img src={imgSrc} alt={imgAlt} className="w-[20px] h-{20px} mr-2" />
      )}
      {label}
    </button>
  );
}
