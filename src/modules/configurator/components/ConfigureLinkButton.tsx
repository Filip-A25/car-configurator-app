import { Link } from "react-router-dom";

interface Props {
  path: string;
  title: string;
}

export function ConfigureLinkButton({ path, title }: Props) {
  return (
    <Link
      to={path}
      className="text-basic-white max-sm:absolute bottom-0 left-0 py-6 sm:py-3 md:py-5 3xl:py-5 text-md lg:text-lg 3xl:text-xl bg-button-purple px-10 max-sm:w-full 3xl:w-60 text-center"
    >
      {title}
    </Link>
  );
}
