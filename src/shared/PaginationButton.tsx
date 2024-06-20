import { IconDirection } from "./types";

interface PaginationButtonProps {
  direction: IconDirection;
  childRef: React.MutableRefObject<HTMLButtonElement | null>;
}

export function PaginationButton({
  direction,
  childRef,
}: PaginationButtonProps) {
  return (
    <button className="w-10 py-2" ref={childRef}>
      <svg
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto w-4 h-4"
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
