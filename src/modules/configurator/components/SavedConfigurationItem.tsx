import { useEffect, useState } from "react";
import { fetchCarImageByColorAndVariant } from "../services";
import { CarPosition, CarModel } from "../types";
import { ConfigOptionsButton } from "./ConfigOptionsButton";
import { OptionsDropdown } from "./OptionsDropdown";

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

  const handleCarImageFetch = async (
    modelName: CarModel,
    color: string,
    wheelVariant: number,
    position: CarPosition
  ) => {
    const image = await fetchCarImageByColorAndVariant({
      modelName,
      color,
      wheelVariant,
      position,
    });

    setImgUrl(image);
  };

  useEffect(() => {
    handleCarImageFetch(name, colorLabel, wheelsLabel, CarPosition.side);
  }, []);

  return (
    <li className="flex bg-basic-white mb-12">
      <section className="basis-[40%] 3xl:basis-[45%]">
        <div className="lg:px-2 xl:px-1 md:py-14 lg:py-16 2xl:py-10">
          <img src={imgUrl} alt={name} />
        </div>
      </section>
      <div className="my-auto md:h-36 lg:h-44 2xl:h-52 3xl:h-64 w-[1px] bg-input-border-gray" />
      <section className="flex basis-[60%] 3xl:basis-[55%] justify-between md:px-10 md:py-8 lg:px-14 2xl:px-12 lg:py-10 xl:py-12 3xl:py-20">
        <div className="flex flex-col justify-between">
          <div className="pb-8">
            <h4 className="text-muted-grey max-lg:text-xs tracking-widest">
              {productionYear}
            </h4>
            <h1 className="md:text-3xl lg:text-5xl xl:text-6xl text-button-purple font-optician-sans">
              {name}
            </h1>
            <h4 className="text-[#505062] max-lg:text-xs lg:text-md 3xl:text-lg tracking-widest">
              {colorName.toUpperCase()}
            </h4>
          </div>
          <span className="text-[#9D9DAF] max-lg:text-sm">
            Created May 22nd 2022
          </span>
        </div>
        <div className="relative">
          <ConfigOptionsButton
            isOptionsDropdownOpen={isOptionsDropdownOpen}
            setIsOptionsDropdownOpen={setIsOptionsDropdownOpen}
          />
          {isOptionsDropdownOpen && (
            <OptionsDropdown id={id} modelId={modelId} />
          )}
        </div>
      </section>
    </li>
  );
}
