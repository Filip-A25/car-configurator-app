import { ConfigPropertyDropdown } from "./ConfigPropertyDropdown";
import { useRecoilValue } from "recoil";
import { dropdownState } from "../state";

export function ConfigSidebar() {
  const dropdownActiveName = useRecoilValue(dropdownState);

  return (
    <div className="min-w-[350px] bg-light-gray-element-color py-6 px-4 absolute right-0 h-full">
      {dropdownActiveName === "color" ? (
        <ConfigPropertyDropdown propertyName="color" />
      ) : dropdownActiveName === "wheels" ? (
        <ConfigPropertyDropdown propertyName="wheels" />
      ) : (
        <>
          <ConfigPropertyDropdown propertyName="color" />
          <ConfigPropertyDropdown propertyName="wheels" />
        </>
      )}
    </div>
  );
}
