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
      <section className="relative flex max-sm:flex-col min-h-[calc(100%-50px)] md:min-h-[calc(100%-60px)] lg:min-h-[calc(100%-70px)]">
        <div
          className={clsx(
            "sm:py-16 max-sm:relative flex sm:items-center max-sm:h-full w-full sm:w-[calc(100%-350px)] md:w-[calc(100%-375px)] lg:w-[calc(100%-425px)] 3xl:w-[calc(100%-565px)]",
            activeDropdownName === "interior_variants"
              ? "max-xs:py-32 xs:py-40"
              : "max-xs:py-20 xs:py-28",
            ((isDropdownOpen && activeDropdownName === "color") ||
              (isDropdownOpen && activeDropdownName === "interior_variants")) &&
              "max-xs:pb-9 max-xs:pt-12 xs:pb-24 xs:pt-36"
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
