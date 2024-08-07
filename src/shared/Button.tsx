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
      ? "bg-button-purple bottom-[180px] h-[48px] sm:h-[44px] lg:h-[50px] 3xl:h-[54px] w-full mb-4 text-basic-white 3xl:text-xl hover:brightness-[110%] transition-all delay-100 ease-in-out"
      : "flex justify-center items-center h-[48px] sm:h-[44px] lg:h-[50px] 3xl:h-[54px] w-full mb-4 text-button-purple 3xl:text-xl border hover:brightness-[110%] transition-all delay-100 ease-in-out";

  return (
    <button {...rest} className={className}>
      {imgSrc && <img src={imgSrc} alt={imgAlt} className="w-5 mr-2" />}
      {label}
    </button>
  );
}
