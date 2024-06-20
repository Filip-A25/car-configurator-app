import { useEffect, useState } from "react";
import { fetchPropertyImagesByVariant } from "../../../services/API_configurations";

interface PropertyProps {
  modelName: string | undefined;
  label: string | number;
  name: string;
  description: string;
}

export function ConfigProperty({
  modelName,
  label,
  name,
  description,
}: PropertyProps) {
  const [propertyImgUrl, setPropertyImgUrl] = useState("");

  useEffect(() => {
    handleImageFetch();
  }, []);

  const handleImageFetch = async () => {
    try {
      if (!modelName) return;
      const photoUrl = await fetchPropertyImagesByVariant(
        modelName,
        name,
        label
      );
      setPropertyImgUrl(photoUrl);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <div className="flex">
      <div className="p-3 relative after:content-['✔'] after:text-[0.6rem] after:text-center after:text-light-gray-background-color after:absolute after:bottom-3 after:right-3 after:w-[14px] after:h-[14px] after:bg-checkmark-green after:rounded-[50%]">
        <img src={propertyImgUrl} alt={name} className="w-12 rounded-[50%]" />
      </div>
      <section className="flex flex-col justify-center">
        <h3 className="text-text-default-gray text-sm">{description}</h3>
        <h4 className="font-optician-sans text-sm text-property-name-grey tracking-[2px]">
          {name}
        </h4>
      </section>
    </div>
  );
}
