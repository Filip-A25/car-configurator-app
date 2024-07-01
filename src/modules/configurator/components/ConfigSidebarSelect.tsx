import { ConfigPropertyDropdown } from "./ConfigPropertyDropdown";
import { useRecoilValue, useRecoilState } from "recoil";
import { dropdownState, dropdownOpen } from "../state";
import { ConfigActionButton } from "./ConfigActionButton";
import { PriceDisplay } from "./PriceDisplay";
import clsx from "clsx";

interface Props {
  propertyName: string;
}

export function ConfigSidebarSelect({ propertyName }: Props) {
  const activeDropdownName = useRecoilValue(dropdownState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(dropdownOpen);

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={clsx(
        "absolute bottom-0 max-sm:w-full sm:right-0 sm:top-0 border-l border-input-border-gray sm:w-[350px] md:w-[425px] lg:w-[475px] 3xl:w-[565px] bg-light-gray-element-color px-6 sm:h-full",
        isDropdownOpen && "sm:animate-sidebarOpenAnimation"
      )}
    >
      <div className="flex flex-col justify-between min-h-full pb-20 sn:pt-8 sm:pb-24 3xl:pb-28">
        <section>
          <div className="flex justify-between px-2 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-10">
            <h1 className="leading-10 text-xl sm:text-2xl capitalize">
              {propertyName}
            </h1>
            <button className="px-3" onClick={handleDropdownClose}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7 0.3C13.3 -0.1 12.7 -0.1 12.3 0.3L7 5.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L5.6 7L0.3 12.3C-0.1 12.7 -0.1 13.3 0.3 13.7C0.5 13.9 0.7 14 1 14C1.3 14 1.5 13.9 1.7 13.7L7 8.4L12.3 13.7C12.5 13.9 12.8 14 13 14C13.2 14 13.5 13.9 13.7 13.7C14.1 13.3 14.1 12.7 13.7 12.3L8.4 7L13.7 1.7C14.1 1.3 14.1 0.7 13.7 0.3Z"
                  fill="#2E2E38"
                />
              </svg>
            </button>
          </div>
          {activeDropdownName === "color" ? (
            <ConfigPropertyDropdown propertyName="color" isActive />
          ) : (
            <ConfigPropertyDropdown propertyName="wheels" isActive />
          )}
        </section>
        <PriceDisplay />
      </div>
      <ConfigActionButton text="Done" isArrow onClick={handleDropdownClose} />
    </div>
  );
}
