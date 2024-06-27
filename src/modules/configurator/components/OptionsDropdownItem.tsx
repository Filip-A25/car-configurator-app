interface OptionsDropdownItemProps {
  title: string;
}

export function OptionsDropdownItem({ title }: OptionsDropdownItemProps) {
  return (
    <li className="border-b border-light-gray-background-color hover:bg-light-gray-element-color cursor-pointer">
      <button
        className={`${
          title === "Delete" ? "text-[#D2341E]" : "text-button-purple"
        } flex w-full text-2xl items-center py-6 px-10 whitespace-nowrap`}
      >
        {title}
      </button>
    </li>
  );
}
