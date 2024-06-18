import { ConfigPropertyDropdown } from "./ConfigPropertyDropdown";

export function ConfigSidebar() {
  return (
    <div className="min-w-[300px] bg-light-gray-element-color py-6 px-4 absolute right-0 h-full">
      <ConfigPropertyDropdown propertyName="paint color" />
      <ConfigPropertyDropdown propertyName="wheels" />
    </div>
  );
}
