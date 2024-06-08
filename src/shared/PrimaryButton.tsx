import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: "primary" | "secondary";
  imgSrc?: string;
  imgAlt?: string;
}

export default function PrimaryButton({
  label,
  variant,
  imgSrc,
  imgAlt,
  ...rest
}: ButtonProps) {
  const className =
    variant === "primary"
      ? "absolute bg-button-purple bottom-[180px] sm:bottom-[120px] right-0 left-0 h-[48px] sm:h-[44px] w-[85%] text-basic-white mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out"
      : "absolute flex justify-center items-center bottom-[60px] right-0 left-0 h-[48px] sm:h-[44px] w-[85%] text-button-purple border-[1px] mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out";

  return (
    <button {...rest} className={className}>
      {imgSrc && (
        <img src={imgSrc} alt={imgAlt} className="w-[20px] h-{20px} mr-2" />
      )}
      {label}
    </button>
  );
}
