import { ConfigPropertyDropdown } from "./ConfigPropertyDropdown";
import { ConfigActionButton } from "./ConfigActionButton";
import { PriceDisplay } from "./PriceDisplay";

export function ConfigSidebar() {
  // TODO: Navigiranje na sljedeci step u configuratoru (interior).
  const handleNavigate = () => {};

  return (
    <div
      className="
      border-l border-input-border-gray bg-light-gray-element-color pt-8 pb-24 px-6 sm:absolute bottom-0 w-full sm:w-fit sm:right-0 sm:top-0 sm:h-full"
    >
      <div className="flex flex-col justify-between min-h-full">
        <section>
          <ConfigPropertyDropdown propertyName="color" isActive={false} />
          <ConfigPropertyDropdown propertyName="wheels" isActive={false} />
        </section>
        <PriceDisplay />
      </div>
      <ConfigActionButton
        text="Interior"
        arrow={true}
        action={handleNavigate}
      />
    </div>
  );
}
