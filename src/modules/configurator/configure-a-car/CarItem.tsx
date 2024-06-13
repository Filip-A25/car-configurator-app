import ButtonLink from "../../../shared/ButtonLink";
import { fetchCarImageByColorAndVariant } from "../../../services/API_carModel";
import { useEffect, useState } from "react";
import { CarPosition } from "../types/carType";
import carIcon from "../assets/car-icon.png";

interface CarItemProps {
  id: string;
  model: string;
  productionYear: number;
  colors: string[];
}

export default function CarItem({
  id,
  model,
  productionYear,
  colors,
}: CarItemProps) {
  const [carImg, setCarImg] = useState("");

  useEffect(() => {
    handleImageFetch();
  }, []);

  const handleImageFetch = async () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const image = await fetchCarImageByColorAndVariant(
      model,
      color,
      1,
      CarPosition.front
    );

    setCarImg(image);
  };

  return (
    <div className="bg-basic-white flex lg:flex-col">
      <section className="overflow-hidden basis-[50%]">
        {carImg !== "" ? (
          <img
            src={carImg}
            alt={model}
            className="cs-item-image object-cover ml-[-30%] lg:ml-[-40%]"
          />
        ) : (
          <div className="cs-item-image flex justify-center items-center">
            <img
              src={carIcon}
              alt="Car Icon"
              className="w-14 h-14 animate-pulse opacity-15"
            />
          </div>
        )}
      </section>
      <section className="relative flex flex-col flex-1 justify-center lg:px-10 py-12 3xl:pt-16 3xl:pb-20">
        <div className="mb-4 3xl:mb-8 overflow-x-hidden">
          <h3 className="text-text-muted-gray text-2xl 3xl:text-4xl cs-font-family font-light leading-none">
            {productionYear}
          </h3>
          <h1 className="text-text-default-gray text-5xl 3xl:text-6xl cs-font-family font-light lg:whitespace-nowrap">
            {model}
          </h1>
        </div>
        <ButtonLink path="/" label="Configure Now" />
      </section>
    </div>
  );
}
