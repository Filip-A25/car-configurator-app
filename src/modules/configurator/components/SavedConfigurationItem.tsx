import { useEffect, useState } from "react";
import { fetchCarImageByColorAndVariant } from "../../../services";
import { CarPosition } from "../types";
import { ConfigOptionsButton } from "./ConfigOptionsButton";
import { OptionsDropdown } from "./OptionsDropdown";

interface SavedConfigurationItemProps {
  name: string;
  productionYear: number;
  colorLabel: string;
  colorName: string;
  wheelsLabel: number;
}

export function SavedConfigurationItem({
  name,
  productionYear,
  colorLabel,
  colorName,
  wheelsLabel,
}: SavedConfigurationItemProps) {
  const [imgUrl, setImgUrl] = useState("");
  const [isOptionsDropdownOpen, setIsOptionsDropdownOpen] = useState(false);

  useEffect(() => {
    handleCarImageFetch(name, colorLabel, wheelsLabel, CarPosition.side);
  }, []);

  const handleCarImageFetch = async (
    modelName: string,
    color: string,
    wheelVariant: number,
    position: CarPosition
  ) => {
    const image = await fetchCarImageByColorAndVariant(
      modelName,
      color,
      wheelVariant,
      position
    );

    setImgUrl(image);
  };

  return (
    <li className="flex bg-basic-white mb-12">
      <section className="basis-[45%]">
        <div className="px-8 py-14">
          <img src={imgUrl} alt={name} />
        </div>
      </section>
      <div className="my-auto h-64 w-[1px] bg-input-border-gray" />
      <section className="flex basis-[55%] justify-between px-20 py-20">
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-muted-grey tracking-widest">
              {productionYear}
            </h4>
            <h1 className="text-6xl text-button-purple font-optician-sans">
              {name}
            </h1>
            <h4 className="text-[#505062] text-lg tracking-widest pt-4">
              {colorName.toUpperCase()}
            </h4>
          </div>
          <span className="text-[#9D9DAF]">Created May 22nd 2022</span>
        </div>
        <div className="relative">
          <ConfigOptionsButton
            isOptionsDropdownOpen={isOptionsDropdownOpen}
            setIsOptionsDropdownOpen={setIsOptionsDropdownOpen}
          />
          {isOptionsDropdownOpen && <OptionsDropdown />}
        </div>
      </section>
    </li>
  );
}
