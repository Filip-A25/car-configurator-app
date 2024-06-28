import { ButtonHTMLAttributes } from "react";

interface OptionsDropdownItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function OptionsDropdownItem({
  title,
  ...props
}: OptionsDropdownItemProps) {
  return (
    <li className="border-b border-light-gray-background-color hover:bg-light-gray-element-color cursor-pointer">
      <button
        className={`${
          title === "Delete" ? "text-[#D2341E]" : "text-button-purple"
        } flex w-full 3xl:text-2xl items-center lg:py-4 2xl:py-5 3xl:py-6 lg:pl-4 lg:pr-12 2xl:pl-8 2xl:pr-20 whitespace-nowrap`}
        {...props}
      >
        {title}
      </button>
    </li>
  );
}
