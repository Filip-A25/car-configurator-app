import { useState, useEffect } from "react";
import { ConfigPropertyDropdown } from "./ConfigPropertyDropdown";
import { ConfigActionButton } from "./ConfigActionButton";
import { PriceDisplay } from "./PriceDisplay";
import { useRecoilValue, useRecoilState } from "recoil";
import { activePageState, pageState } from "../state";

export function ConfigSidebar() {
  const activePage = useRecoilValue(activePageState);
  const [pages, setPages] = useRecoilState(pageState);
  const [activePageName, setActivePageName] = useState(activePage?.name);

  const handleNavigateNext = () => {
    if (!activePage) return;

    const newPages = pages.map((page) => ({
      ...page,
      isActive: page.index === activePage.index + 1,
    }));

    setPages(newPages);
  };

  useEffect(() => {
    setActivePageName(activePage?.name);
  }, [activePage]);

  return (
    <div
      className="
      border-l border-input-border-gray bg-light-gray-element-color sm:w-[350px] md:w-[425px] lg:w-[475px] 3xl:w-[565px] pt-5 pb-20 sn:pt-8 sm:pb-24 3xl:pb-28 px-6 absolute bottom-0 w-full sm:right-0 sm:top-0 sm:h-full"
    >
      <div className="flex flex-col justify-between min-h-full">
        <section className="pb-4 xs:pb-16">
          {activePageName === "Interior" ? (
            <ConfigPropertyDropdown
              propertyName="interior_variants"
              isActive={false}
            />
          ) : (
            <>
              <ConfigPropertyDropdown propertyName="color" isActive={false} />
              <ConfigPropertyDropdown propertyName="wheels" isActive={false} />
            </>
          )}
        </section>
        <PriceDisplay />
      </div>
      <ConfigActionButton
        text="Interior"
        isArrow
        onClick={handleNavigateNext}
      />
    </div>
  );
}
