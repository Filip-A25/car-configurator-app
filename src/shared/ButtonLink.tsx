import { Link } from "react-router-dom";

interface ButtonLinkProps {
  label: string;
  path: string;
}

export default function PrimaryButtonLink({ label, path }: ButtonLinkProps) {
  return (
    <Link
      to={path}
      className="bg-button-purple text-xs md:text-sm 3xl:text-lg py-3 md:py-3 3xl:py-5 text-center w-fit px-6 md:px-14 text-basic-white hover:brightness-[110%] transition-all delay-100 ease-in-out"
    >
      {label}
    </Link>
  );
}
