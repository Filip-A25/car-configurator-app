import { ConfigPropertyDropdown } from "./ConfigPropertyDropdown";
import { ConfigActionButton } from "./ConfigActionButton";

export function ConfigSidebar() {
  return (
    <div className="xl:min-w-[325px] 2xl:min-w-[400px] bg-light-gray-element-color py-8 px-4 absolute right-0 top-0 h-full">
      <div className="relative h-full">
        <ConfigPropertyDropdown propertyName="color" isActive={false} />
        <ConfigPropertyDropdown propertyName="wheels" isActive={false} />
        <ConfigActionButton text="Interior" />
      </div>
    </div>
  );
}
