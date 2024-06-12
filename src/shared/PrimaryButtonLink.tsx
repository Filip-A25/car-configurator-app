import { Link } from "react-router-dom";

interface ButtonLinkProps {
  label: string;
  path: string;
}

export default function PrimaryButtonLink({ label, path }: ButtonLinkProps) {
  return (
    <Link
      to={path}
      className="bg-button-purple text-xs py-3 px-10 mb-4 text-basic-white hover:brightness-[110%] transition-all delay-100 ease-in-out"
    >
      {label}
    </Link>
  );
}
