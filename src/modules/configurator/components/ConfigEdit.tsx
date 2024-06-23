import { ConfigNavbar } from "./ConfigNavbar";
import { ConfigSidebar } from "./ConfigSidebar";
import { ConfigSidebarSelect } from "./ConfigSidebarSelect";
import { CarImageSlide } from "./CarImageSlide";
import { useConfigEdit } from "../hooks";

export function ConfigEdit() {
  const { configurations, isDropdownOpen, activeDropdownName } =
    useConfigEdit();

  return (
    <section className="relative">
      <ConfigNavbar
        model={configurations?.model}
        productionYear={configurations?.productionYear}
      />
      <div>
        <section className="relative flex min-h-[calc(100vh-140px)]">
          <div className="flex items-center w-[calc(100%-250px)] md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] 2xl:w-[calc(100%-425px)] 3xl:w-[calc(100%-500px)]">
            <CarImageSlide />
          </div>
          {!isDropdownOpen && <ConfigSidebar />}
        </section>
        {isDropdownOpen && (
          <ConfigSidebarSelect propertyName={activeDropdownName} />
        )}
      </div>
    </section>
  );
}
