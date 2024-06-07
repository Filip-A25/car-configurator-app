import { Link } from "react-router-dom";

interface Props {
  title: string;
  path: string;
}

export default function PrimaryButtonLink({ title, path }: Props) {
  return (
    <Link
      to={path}
      className="text-basic-white bg-button-purple link-button-height w-full sm:link-button-width text-sm leading-[44px] text-center"
    >
      {title}
    </Link>
  );
}
