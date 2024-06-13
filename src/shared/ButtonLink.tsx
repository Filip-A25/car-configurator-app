import { Link } from "react-router-dom";

interface ButtonLinkProps {
  label: string;
  path: string;
}

export default function PrimaryButtonLink({ label, path }: ButtonLinkProps) {
  return (
    <Link
      to={path}
      className="absolute bottom-0 md:static bg-button-purple text-sm 3xl:text-lg py-6 md:py-3 3xl:py-5 text-center w-full md:w-fit md:px-11 text-basic-white hover:brightness-[110%] transition-all delay-100 ease-in-out"
    >
      {label}
    </Link>
  );
}
