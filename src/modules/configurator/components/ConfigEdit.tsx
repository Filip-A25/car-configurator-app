import { ConfigSidebar } from "./ConfigSidebar";
import { ConfigSidebarSelect } from "./ConfigSidebarSelect";
import { CarImageSlide } from "./CarImageSlide";
import { CarPropertyName } from "../types";
import clsx from "clsx";

interface Props {
  isDropdownOpen: boolean;
  activeDropdownName: CarPropertyName;
}

export function ConfigEdit({ isDropdownOpen, activeDropdownName }: Props) {
  return (
    <>
      <section className="sm:relative flex max-sm:flex-col sm:h-[calc(100vh-130px)] lg:h-[calc(100vh-140px)]">
        <div
          className={clsx(
            "sm:py-16 max-sm:relative flex sm:items-center max-sm:h-full w-full sm:w-[calc(100%-350px)] md:w-[calc(100%-375px)] lg:w-[calc(100%-425px)] 3xl:w-[calc(100%-565px)]",
            activeDropdownName === "interior_variants"
              ? "max-xs:py-32 xs:py-40 2xs::py-12"
              : "max-xs:py-20 xs:py-36 2xs:py-10",
            ((isDropdownOpen && activeDropdownName === "color") ||
              (isDropdownOpen && activeDropdownName === "interior_variants")) &&
              "max-xs:pb-9 max-xs:pt-12 xs:pb-24 xs:pt-36 2xs:py-5"
          )}
        >
          <CarImageSlide />
        </div>
        {!isDropdownOpen && <ConfigSidebar />}
      </section>
      {isDropdownOpen && activeDropdownName && (
        <ConfigSidebarSelect propertyName={activeDropdownName} />
      )}
    </>
  );
}
