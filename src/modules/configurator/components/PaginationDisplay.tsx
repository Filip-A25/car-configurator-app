import { pageState } from "../state";
import { useRecoilValue } from "recoil";
import clsx from "clsx";

export function PaginationDisplay() {
  const pageStep = useRecoilValue(pageState);

  return (
    <>
      {pageStep.map((page, index) => (
        <h3
          className={clsx(
            "sm:px-4 lg:px-8",
            page.isActive ? "font-bold" : "max-sm:hidden"
          )}
          key={index}
        >
          <span className="text-muted-grey">{"0" + page.index} </span>
          {page.name}
        </h3>
      ))}
    </>
  );
}
