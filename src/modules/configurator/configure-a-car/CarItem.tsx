import PrimaryButtonLink from "../../../shared/PrimaryButtonLink";
import { fetchCarImageByColorAndVariant } from "../../../services/API_carModel";
import { useEffect, useState } from "react";
import { CarPos } from "../types/carType";

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
      id,
      color,
      1,
      CarPos.front
    );

    setCarImg(image);
  };

  return (
    <div>
      <section>
        <img src={carImg} alt={model} />
      </section>
      <section>
        <h3>{productionYear}</h3>
        <h1>{model}</h1>
        <PrimaryButtonLink path="/" label="Configure Now" />
      </section>
    </div>
  );
}
