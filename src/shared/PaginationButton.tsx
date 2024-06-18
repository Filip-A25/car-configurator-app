import { IconDirection } from "./types";

interface PaginationButtonProps {
  direction: IconDirection;
  ref: any;
}

export function PaginationButton({ direction, ref }: PaginationButtonProps) {
  return (
    <button className="w-[24px] h-[24px]" ref={ref}>
      <svg
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d={direction}
          fill="#2E2E38"
        />
      </svg>
    </button>
  );
}
