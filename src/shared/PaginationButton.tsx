import { IconDirection } from "./types";

export function PaginationButton({ direction }: { direction: IconDirection }) {
  return (
    <button className="w-[24px] h-[24px]">
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
