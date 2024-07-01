import { ConfigNavbar } from "./ConfigNavbar";
import { ConfigSidebar } from "./ConfigSidebar";
import { ConfigSidebarSelect } from "./ConfigSidebarSelect";
import { CarImageSlide } from "./CarImageSlide";
import { useConfigEdit } from "../hooks";
import clsx from "clsx";

export function ConfigEdit() {
  const { configurations, isDropdownOpen, activeDropdownName } =
    useConfigEdit();

  return (
    <section className="relative h-full">
      <ConfigNavbar
        model={configurations?.model}
        productionYear={configurations?.productionYear}
      />
      <section className="relative flex max-sm:flex-col min-h-[calc(100%-50px)] sm:min-h-[calc(100%-70px)]">
        <div
          className={clsx(
            "max-xs:py-14 xs:py-28 max-sm:relative flex sm:items-center max-sm:h-full w-full sm:w-[calc(100%-350px)] md:w-[calc(100%-425px)] lg:w-[calc(100%-475px)] 3xl:w-[calc(100%-565px)]",
            isDropdownOpen && activeDropdownName === "color" && "max-xs:py-4"
          )}
        >
          <CarImageSlide />
        </div>
        {!isDropdownOpen && <ConfigSidebar />}
      </section>
      {isDropdownOpen && activeDropdownName && (
        <ConfigSidebarSelect propertyName={activeDropdownName} />
      )}
    </section>
  );
}
