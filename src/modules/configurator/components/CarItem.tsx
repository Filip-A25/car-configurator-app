import ButtonLink from "../../../shared/ButtonLink";
import { fetchCarImageByColorAndVariant } from "../services";
import { useEffect, useState } from "react";
import { CarModel, TextVariant, CarPosition } from "../types";
import { configuratorRoutes } from "../const";
import { PageLoading } from "../../global/components";

interface Props {
  id: string;
  model: CarModel;
  productionYear: number;
  color: TextVariant[];
}

export function CarItem({ id, model, productionYear, color }: Props) {
  const [carImg, setCarImg] = useState("");

  useEffect(() => {
    handleImageFetch();
  }, []);

  const handleImageFetch = async () => {
    const randomColor = color[Math.floor(Math.random() * color.length)];

    const image = await fetchCarImageByColorAndVariant({
      modelName: model,
      color: randomColor.label,
      wheelVariant: 1,
      position: CarPosition.front,
    });

    setCarImg(image);
  };

  return (
    <div className="bg-basic-white flex lg:flex-col min-h-full">
      <section className="overflow-hidden">
        {carImg !== "" ? (
          <img
            src={carImg}
            alt={model}
            className="block max-xs:min-h-[150px] min-h-[175px] sm:min-h-[300px] md:min-h-[325px] lg:min-h-[350px] 2xl:min-h-[375px] 3xl:min-h-[550px] object-cover ml-[-35%] md:ml-[-30%] lg:ml-[-35%]"
          />
        ) : (
          <PageLoading />
        )}
      </section>
      <section className="relative flex flex-col flex-1 justify-center lg:px-10 py-4 md:py-8 3xl:pt-16 3xl:pb-20">
        <div className="mb-4 3xl:mb-8 overflow-x-hidden">
          <h3 className="text-text-muted-gray max-xs:text-lg text-xl 3xl:text-4xl font-optician-sans font-light leading-none">
            {productionYear}
          </h3>
          <h1 className="text-text-default-gray max-xs:text-xl text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl font-optician-sans font-light lg:whitespace-nowrap">
            {model}
          </h1>
        </div>
        <ButtonLink
          path={`${configuratorRoutes.configurationEditQuery}?modelId=${id}`}
          label="Configure Now"
        />
      </section>
    </div>
  );
}
