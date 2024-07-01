import { ConfigPropertyDropdown } from "./ConfigPropertyDropdown";
import { ConfigActionButton } from "./ConfigActionButton";
import { PriceDisplay } from "./PriceDisplay";

export function ConfigSidebar() {
  // TODO: Handling navigation to the next step in the configurator (interior).
  const handleNavigate = () => {};

  return (
    <div
      className="
      border-l border-input-border-gray bg-light-gray-element-color sm:w-[350px] md:w-[425px] lg:w-[475px] 3xl:w-[565px] pt-5 pb-20 sn:pt-8 sm:pb-24 3xl:pb-28 px-6 absolute bottom-0 w-full sm:right-0 sm:top-0 sm:h-full"
    >
      <div className="flex flex-col justify-between min-h-full">
        <section className="pb-4 xs:pb-16">
          <ConfigPropertyDropdown propertyName="color" isActive={false} />
          <ConfigPropertyDropdown propertyName="wheels" isActive={false} />
        </section>
        <PriceDisplay />
      </div>
      <ConfigActionButton text="Interior" isArrow onClick={handleNavigate} />
    </div>
  );
}
