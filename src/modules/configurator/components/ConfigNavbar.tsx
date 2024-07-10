import { ReturnButton } from "../../../shared";
import { dropdownOpen } from "../state";
import { useRecoilValue } from "recoil";
import clsx from "clsx";
import { PaginationDisplay } from "./PaginationDisplay";
import { ConfigOptionsDisplay } from "./ConfigOptionsDisplay";

interface Props {
  returnPath: string;
  model?: string;
  productionYear?: number;
  isConfigurationEdit?: boolean;
}

export function ConfigNavbar({
  model,
  productionYear,
  returnPath,
  isConfigurationEdit,
}: Props) {
  const isDropdownOpen = useRecoilValue(dropdownOpen);

  return (
    <div className="h-[50px] sm:h-[70px] bg-light-gray-element-color border-b border-input-border-gray flex justify-between items-center px-4 sm:px-10 2xl:px-12">
      <section className="flex justify-between text-lg sm:text-2xl 3xl:text-3xl text-text-default-gray">
        <ReturnButton path={returnPath} />
        <h3 className="max-sm:hidden text-muted-grey font-optician-sans px-2">
          {productionYear}
        </h3>
        <h3 className="max-sm:hidden font-optician-sans px-2">{model}</h3>
      </section>
      <section
        className={clsx(
          "flex justify-between text-text-default-gray text-sm sm:text-md md:text-lg 3xl:text-xl",
          isDropdownOpen && "hidden"
        )}
      >
        {isConfigurationEdit ? <PaginationDisplay /> : <ConfigOptionsDisplay />}
      </section>
    </div>
  );
}
