import PrimaryButtonLink from "../../../shared/PrimaryButtonLink";
import { fetchCarImageByColorAndVariant } from "../../../services/API_carModel";
import { useEffect, useState } from "react";
import { CarPosition } from "../types/carType";

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
    <div className="bg-basic-white">
      <section className="overflow-hidden">
        <img
          src={carImg}
          alt={model}
          className="h-[325px] object-cover ml-[-35%]"
        />
      </section>
      <section className="px-10 py-10">
        <h3 className="text-text-muted-gray text-xl cs-font-family font-light">
          {productionYear}
        </h3>
        <h1 className="text-text-default-gray text-4xl cs-font-family font-light">
          {model}
        </h1>
        <PrimaryButtonLink path="/" label="Configure Now" />
      </section>
    </div>
  );
}
