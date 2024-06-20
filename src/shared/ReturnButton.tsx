import { Link } from "react-router-dom";

export function ReturnButton({ path }: { path: string }) {
  return (
    <Link to={path} className="flex items-center">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.3536 0.146447C12.5488 0.341709 12.5488 0.658291 12.3536 0.853553L5.20711 8L12.3536 15.1464C12.5488 15.3417 12.5488 15.6583 12.3536 15.8536C12.1583 16.0488 11.8417 16.0488 11.6464 15.8536L4.14645 8.35355C3.95118 8.15829 3.95118 7.84171 4.14645 7.64645L11.6464 0.146447C11.8417 -0.0488155 12.1583 -0.0488155 12.3536 0.146447Z"
          fill="#2E2E38"
        />
      </svg>
    </Link>
  );
}
