import { ReturnButton } from "../../../shared";
import { dropdownOpen } from "../state";
import { useRecoilValue } from "recoil";
import { pageState } from "../state";
import clsx from "clsx";

interface Props {
  model?: string;
  productionYear?: number;
}

export function ConfigNavbar({ model, productionYear }: Props) {
  const isDropdownOpen = useRecoilValue(dropdownOpen);
  const pageStep = useRecoilValue(pageState);

  return (
    <div className="h-[50px] sm:h-[70px] bg-light-gray-element-color border-b border-input-border-gray flex justify-between items-center px-4 sm:px-10 2xl:px-12">
      <section className="flex justify-between text-lg sm:text-2xl 3xl:text-3xl text-text-default-gray">
        <ReturnButton path="/car-select" />
        <h3 className="text-muted-grey font-optician-sans px-2">
          {productionYear}
        </h3>
        <h3 className="font-optician-sans px-2">{model}</h3>
      </section>
      <section
        className={clsx(
          "flex justify-between text-text-default-gray text-sm sm:text-md md:text-lg 3xl:text-xl",
          isDropdownOpen && "hidden"
        )}
      >
        {pageStep.map((page, index) => (
          <h3
            className={clsx("sm:px-4 lg:px-8", {
              "font-bold": page.isActive,
              "max-sm:hidden": !page.isActive,
            })}
            key={index}
          >
            <span className="text-muted-grey">{"0" + page.index} </span>
            {page.name}
          </h3>
        ))}
      </section>
    </div>
  );
}
