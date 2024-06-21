import { useEffect, useState, SetStateAction } from "react";
import { fetchPropertyImagesByVariant } from "../../../services/API_configurations";
import { dropdownState, userConfiguration } from "../state";
import { useSetRecoilState, useRecoilState } from "recoil";

interface PropertyProps {
  index: number;
  propertyName: "color" | "wheels";
  modelName: string | undefined;
  label: string | number;
  name: string;
  description: string;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<SetStateAction<boolean>>;
  setActivePropIndex: React.Dispatch<SetStateAction<number>>;
}

export function ConfigProperty({
  index,
  propertyName,
  modelName,
  label,
  name,
  description,
  isDropdownOpen,
  setIsDropdownOpen,
  setActivePropIndex,
}: PropertyProps) {
  const [propertyImgUrl, setPropertyImgUrl] = useState("");
  const setActiveDropdownName = useSetRecoilState(dropdownState);
  const [currentUserConfiguration, setCurrentUserConfiguration] =
    useRecoilState(userConfiguration);

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

  const handleOpenDropdown = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      setActiveDropdownName(propertyName);
    } else {
      if (!currentUserConfiguration) return;
      setCurrentUserConfiguration({
        ...currentUserConfiguration,
        [propertyName]: label,
      });
      setActivePropIndex(index);
      setIsDropdownOpen(false);
      setActiveDropdownName("all");
    }
  };

  return (
    <button className="flex items-center" onClick={handleOpenDropdown}>
      <div className="p-3">
        <img src={propertyImgUrl} alt={name} className="w-12 rounded-[50%]" />
      </div>
      <section className="text-left pl-3">
        <h3 className="text-text-default-gray text-md">{description}</h3>
        <h4 className="font-optician-sans text-sm text-property-name-grey tracking-[2px]">
          {name}
        </h4>
      </section>
    </button>
  );
}
