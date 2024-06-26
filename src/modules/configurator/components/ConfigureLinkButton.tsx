import { Link } from "react-router-dom";

interface Props {
  path: string;
  title: string;
}

export function ConfigureLinkButton({ path, title }: Props) {
  return (
    <Link
      to={path}
      className="text-basic-white bg-button-purple w-full sm:link-button-width text-sm leading-[44px] text-center"
    >
      {title}
    </Link>
  );
}
