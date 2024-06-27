import { Link } from "react-router-dom";

interface Props {
  path: string;
  title: string;
}

export function ConfigureLinkButton({ path, title }: Props) {
  return (
    <Link
      to={path}
      className="text-basic-white text-sm py-5 3xl:text-xl bg-button-purple w-full sm:w-40 3xl:w-60 text-center"
    >
      {title}
    </Link>
  );
}
