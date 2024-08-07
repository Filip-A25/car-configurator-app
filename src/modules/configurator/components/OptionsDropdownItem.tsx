import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function OptionsDropdownItem({ title, ...props }: Props) {
  return (
    <li className="border-b border-light-gray-background-color bg-mobile-light-element-color md:bg-basic-white hover:bg-light-gray-element-color cursor-pointer">
      <button
        className={`${
          title === "Delete" ? "text-text-red" : "text-button-purple"
        } flex w-full 3xl:text-2xl items-center max-md:py-3 max-md:pl-4 max-md:pr-10 md:py-3 md:pl-3 md:pr-8 lg:py-4 2xl:py-5 3xl:py-6 lg:pl-4 lg:pr-12 2xl:pl-8 2xl:pr-20 whitespace-nowrap`}
        {...props}
      >
        {title}
      </button>
    </li>
  );
}
