import { IconDirection } from "./types";

interface PaginationButtonProps {
  direction: IconDirection;
  childRef: React.MutableRefObject<HTMLButtonElement | null>;
  className: string;
}

export function PaginationButton({
  direction,
  childRef,
  className,
}: PaginationButtonProps) {
  return (
    <button className={className} ref={childRef}>
      <svg
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto w-3 h-3 sm:w-4 sm:h-4"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={direction}
          fill="#2E2E38"
        />
      </svg>
    </button>
  );
}
