import pageNotFoundIcon from "./assets/page-not-found-icon.png";
import { Link } from "react-router-dom";

interface Props {
  returnPageTitle: string;
  returnPagePath: string;
}

export function NotFoundPage({ returnPageTitle, returnPagePath }: Props) {
  return (
    <div className="w-full justify-center max-md:px-8 py-36">
      <section className="flex flex-col justify-center items-center pb-4 sm:pb-6">
        <img
          src={pageNotFoundIcon}
          alt="Page not found."
          className="w-20 md:w-24 lg:w-28 pb-4 lg:pb-4"
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-muted-grey">
          Error 404: Page could not be found.
        </h1>
      </section>
      <Link to={returnPagePath} className="text-text-purple text-center">
        <h2>Return to {returnPageTitle}.</h2>
      </Link>
    </div>
  );
}
