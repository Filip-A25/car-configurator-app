import { Link } from "react-router-dom";

interface Props {
  path: string;
  title: string;
}

export default function ConfigureLinkButton({ path, title }: Props) {
  return (
    <Link
      to={path}
      className="text-basic-white bg-button-purple link-button-height w-full sm:link-button-width text-sm text-center leading-[44px]"
    >
      {title}
    </Link>
  );
}
