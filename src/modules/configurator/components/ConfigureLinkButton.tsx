import { Link } from "react-router-dom";

interface Props {
  path: string;
  title: string;
}

export function ConfigureLinkButton({ path, title }: Props) {
  return (
    <Link
      to={path}
      className="text-basic-white sm:py-3 md:py-4 3xl:py-5 text-sm sm:text-md lg:text-lg 3xl:text-xl bg-button-purple px-10 max-sm:w-full 3xl:w-60 text-center"
    >
      {title}
    </Link>
  );
}
