import { CarModel } from "../types";
import { ConfigOptionsButton } from "./ConfigOptionsButton";
import { OptionsDropdown } from "./OptionsDropdown";
import { Timestamp } from "firebase/firestore";
import { useSavedConfiguration } from "../hooks";
import { PageLoading } from "../../global/components";

interface Props {
  name: CarModel;
  modelId: string;
  productionYear: number;
  colorLabel: string;
  colorName: string;
  wheelsLabel: number;
  creationDate: Timestamp;
  id?: string;
}

export function SavedConfigurationItem({
  id,
  name,
  modelId,
  productionYear,
  colorLabel,
  colorName,
  wheelsLabel,
  creationDate,
}: Props) {
  const {
    imgUrl,
    isOptionsDropdownOpen,
    setIsOptionsDropdownOpen,
    displayDate,
  } = useSavedConfiguration({ name, colorLabel, wheelsLabel, creationDate });

  if (!imgUrl) return <PageLoading />;

  return (
    <li className="flex max-md:flex-col bg-mobile-light-element-color md:bg-basic-white mb-8 sm:mb-12">
      <section className="basis-[40%] 3xl:basis-[45%]">
        {!Boolean(imgUrl.length) ? (
          <PageLoading />
        ) : (
          <div className="lg:px-2 xl:px-1 md:py-14 lg:py-16 2xl:py-10">
            <img src={imgUrl} alt={name} />
          </div>
        )}
      </section>
      <div className="max-md:hidden my-auto md:h-36 lg:h-44 2xl:h-52 3xl:h-64 w-[1px] bg-input-border-gray" />
      <section className="flex basis-[60%] 3xl:basis-[55%] justify-between md:px-10 md:py-8 lg:px-14 2xl:px-12 lg:py-10 xl:py-12 3xl:py-20">
        <div className="flex flex-col justify-between max-md:py-4 max-md:px-6">
          <div className="max-md:text-left pb-2 md:pb-8">
            <h4 className="text-muted-grey max-lg:text-xs tracking-widest">
              {productionYear}
            </h4>
            <h1 className="text-3xl md:text-3xl lg:text-5xl xl:text-6xl text-button-purple font-optician-sans">
              {name}
            </h1>
            <h4 className="text-text-dark-gray max-lg:text-xs lg:text-md 3xl:text-lg tracking-widest">
              {colorName.toUpperCase()}
            </h4>
          </div>
          <span className="text-text-light-grey max-lg:text-sm max-md:text-left">
            Created {displayDate}
          </span>
        </div>
        <div className="relative max-md:flex max-md:py-10 max-md:px-3">
          <ConfigOptionsButton
            isOptionsDropdownOpen={isOptionsDropdownOpen}
            setIsOptionsDropdownOpen={setIsOptionsDropdownOpen}
          />
          {isOptionsDropdownOpen && id && (
            <OptionsDropdown
              id={id}
              modelId={modelId}
              setIsOptionsDropdownOpen={setIsOptionsDropdownOpen}
            />
          )}
        </div>
      </section>
    </li>
  );
}
