import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  imgSrc?: string;
  imgAlt?: string;
}

export default function PrimaryButton({
  label,
  imgSrc,
  imgAlt,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className="absolute bg-button-purple bottom-[180px] sm:bottom-[120px] right-0 left-0 h-[48px] sm:h-[44px] w-[85%] text-basic-white mx-auto hover:brightness-[110%] transition-all delay-100 ease-in-out"
    >
      {imgSrc && <img src={imgSrc} alt={imgAlt} />}
      {label}
    </button>
  );
}
