import { ConfigPropertyDropdown } from "./ConfigPropertyDropdown";
import { useRecoilValue, useRecoilState } from "recoil";
import { dropdownState, dropdownOpen } from "../state";
import { ConfigActionButton } from "./ConfigActionButton";

interface SidebarSelectProps {
  propertyName: string | undefined;
}

export function ConfigSidebarSelect({ propertyName }: SidebarSelectProps) {
  const activeDropdownName = useRecoilValue(dropdownState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownOpen);

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`${
        isDropdownOpen && "animate-sidebarOpenAnimation"
      } absolute right-0 top-0 border-l border-input-border-gray xl:min-w-[400px] 2xl:min-w-[500px] bg-light-gray-element-color px-4 h-full`}
    >
      <h1 className="leading-10 px-5 pt-4 pb-12 font-optician-sans text-3xl">
        {propertyName}
      </h1>
      {activeDropdownName === "color" && (
        <ConfigPropertyDropdown propertyName="color" isActive={true} />
      )}
      {activeDropdownName === "wheels" && (
        <ConfigPropertyDropdown propertyName="wheels" isActive={true} />
      )}
      <ConfigActionButton
        text="Done"
        arrow={false}
        action={handleDropdownClose}
      />
    </div>
  );
}
