import { Link } from "react-router-dom";

interface ButtonLinkProps {
  label: string;
  path: string;
}

export default function PrimaryButtonLink({ label, path }: ButtonLinkProps) {
  return (
    <Link
      to={path}
      className="text-basic-white bg-button-purple link-button-height w-full sm:link-button-width text-sm leading-[44px] text-center"
    >
      {label}
    </Link>
  );
}
