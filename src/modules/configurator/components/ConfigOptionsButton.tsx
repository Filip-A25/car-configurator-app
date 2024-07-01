interface ConfigOptionsButtonProps {
  isOptionsDropdownOpen: boolean;
  setIsOptionsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConfigOptionsButton({
  isOptionsDropdownOpen,
  setIsOptionsDropdownOpen,
}: ConfigOptionsButtonProps) {
  return (
    <button
      onClick={() => setIsOptionsDropdownOpen(!isOptionsDropdownOpen)}
      onBlur={() => setIsOptionsDropdownOpen(false)}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[24px] h-[24px] sm:w-[16px] sm:h-[16px] 3xl:w-[24px] 3xl:h-[24px]"
      >
        <path
          d="M10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10C9.10457 10 10 9.10457 10 8Z"
          fill="#9898F0"
        />
        <path
          d="M10 14C10 12.8954 9.10457 12 8 12C6.89543 12 6 12.8954 6 14C6 15.1046 6.89543 16 8 16C9.10457 16 10 15.1046 10 14Z"
          fill="#9898F0"
        />
        <path
          d="M10 2C10 0.895431 9.10457 0 8 0C6.89543 0 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z"
          fill="#9898F0"
        />
      </svg>
    </button>
  );
}
