import { useEffect, useState } from "react";
import { fetchCarImageByColorAndVariant } from "../services";
import { CarPosition, CarModel, CarImageFetchProps } from "../types";
import { ConfigOptionsButton } from "./ConfigOptionsButton";
import { OptionsDropdown } from "./OptionsDropdown";
import { userConfigurationsState } from "../state";
import { useRecoilValue } from "recoil";

interface Props {
  id: string;
  name: CarModel;
  modelId: string;
  productionYear: number;
  colorLabel: string;
  colorName: string;
  wheelsLabel: number;
}

export function SavedConfigurationItem({
  id,
  name,
  modelId,
  productionYear,
  colorLabel,
  colorName,
  wheelsLabel,
}: Props) {
  const [imgUrl, setImgUrl] = useState("");
  const [isOptionsDropdownOpen, setIsOptionsDropdownOpen] = useState(false);
  const userConfigurations = useRecoilValue(userConfigurationsState);

  const handleCarImageFetch = async ({
    modelName,
    color,
    wheelVariant,
    position,
  }: CarImageFetchProps) => {
    const image = await fetchCarImageByColorAndVariant({
      modelName,
      color,
      wheelVariant,
      position,
    });

    setImgUrl(image);
  };

  useEffect(() => {
    handleCarImageFetch({
      modelName: name,
      color: colorLabel,
      wheelVariant: wheelsLabel,
      position: CarPosition.side,
    });
  }, [userConfigurations]);

  return (
    <li className="flex max-sm:flex-col bg-mobile-light-element-color sm:bg-basic-white mb-8 sm:mb-12">
      <section className="basis-[40%] 3xl:basis-[45%]">
        <div className="lg:px-2 xl:px-1 md:py-14 lg:py-16 2xl:py-10">
          <img src={imgUrl} alt={name} />
        </div>
      </section>
      <div className="max-sm:hidden my-auto md:h-36 lg:h-44 2xl:h-52 3xl:h-64 w-[1px] bg-input-border-gray" />
      <section className="flex basis-[60%] 3xl:basis-[55%] justify-between md:px-10 md:py-8 lg:px-14 2xl:px-12 lg:py-10 xl:py-12 3xl:py-20">
        <div className="flex flex-col justify-between max-sm:py-4 max-sm:px-6">
          <div className="max-sm:text-left pb-2 sm:pb-8">
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
          <span className="text-text-light-grey max-lg:text-sm max-sm:text-left">
            Created May 22nd 2022
          </span>
        </div>
        <div className="relative max-sm:flex max-sm:py-10 max-sm:px-3">
          <ConfigOptionsButton
            isOptionsDropdownOpen={isOptionsDropdownOpen}
            setIsOptionsDropdownOpen={setIsOptionsDropdownOpen}
          />
          {isOptionsDropdownOpen && (
            <OptionsDropdown
              id={id}
              setIsOptionsDropdownOpen={setIsOptionsDropdownOpen}
            />
          )}
        </div>
      </section>
    </li>
  );
}
