import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function OptionsButton({ title, ...props }: Props) {
  return (
    <button
      className={clsx(
        "flex w-full 3xl:text-2xl items-center max-md:py-3 max-md:pl-4 max-md:pr-10 lg:py-4 2xl:py-5 3xl:py-6 lg:pl-4 lg:pr-12 2xl:pl-8 2xl:pr-20 whitespace-nowrap",
        title === "Delete" ? "text-text-red" : "text-button-purple"
      )}
      {...props}
    >
      {title}
    </button>
  );
}
