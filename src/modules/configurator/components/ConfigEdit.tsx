import { ConfigSidebar } from "./ConfigSidebar";
import { ConfigSidebarSelect } from "./ConfigSidebarSelect";
import { CarImageSlide } from "./CarImageSlide";
import { useConfigEdit } from "../hooks";
import clsx from "clsx";

export function ConfigEdit() {
  const { isDropdownOpen, activeDropdownName } = useConfigEdit();

  return (
    <>
      <section className="relative flex max-sm:flex-col min-h-[calc(100%-50px)] sm:min-h-[calc(100%-70px)]">
        <div
          className={clsx(
            "max-sm:relative flex sm:items-center max-sm:h-full w-full sm:w-[calc(100%-350px)] md:w-[calc(100%-425px)] lg:w-[calc(100%-475px)] 3xl:w-[calc(100%-565px)]",
            activeDropdownName === "interior_variants"
              ? "max-xs:py-24 xs:py-40"
              : "max-xs:py-14 xs:py-28",
            ((isDropdownOpen && activeDropdownName === "color") ||
              (isDropdownOpen && activeDropdownName === "interior_variants")) &&
              "max-xs:py-4"
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
