import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isArrow: boolean;
}

export function ConfigActionButton({ text, isArrow, ...props }: Props) {
  return (
    <button
      className="absolute flex justify-center bottom-0 left-0 bg-button-purple w-full py-5 3xl:py-7"
      {...props}
    >
      <span className="text-light-gray-element-color text-md lg:text-lg 3xl:text-2xl">
        {text}
      </span>
      {isArrow && (
        <svg
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-3 my-auto w-3 h-3"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.131426 0.162141C-0.0551704 0.3657 -0.0414189 0.681984 0.162141 0.86858L5.76006 6L0.162141 11.1314C-0.0414189 11.318 -0.0551704 11.6343 0.131426 11.8379C0.318022 12.0414 0.634306 12.0552 0.837866 11.8686L6.83787 6.36858C6.94118 6.27387 7 6.14016 7 6C7 5.85985 6.94118 5.72613 6.83787 5.63143L0.837866 0.131426C0.634306 -0.0551703 0.318022 -0.0414189 0.131426 0.162141Z"
            fill="#FCFCFD"
          />
        </svg>
      )}
    </button>
  );
}
