import { useEffect, useState, SetStateAction } from "react";
import { fetchPropertyImagesByVariant } from "../../../services/API_configurations";
import { dropdownState, dropdownOpen, userConfiguration } from "../state";
import { useSetRecoilState, useRecoilState } from "recoil";

interface PropertyProps {
  index: number;
  propertyName: "color" | "wheels";
  modelName: string | undefined;
  label: string | number;
  name: string;
  description: string;
  isDropdownOpen: boolean;
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
  setActivePropIndex,
}: PropertyProps) {
  const [propertyImgUrl, setPropertyImgUrl] = useState("");
  const setActiveDropdownName = useSetRecoilState(dropdownState);
  const setIsDropdownOpen = useSetRecoilState(dropdownOpen);
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
    }
  };

  return (
    <button className="flex items-center" onClick={handleOpenDropdown}>
      <div className="p-5">
        <img
          src={propertyImgUrl}
          alt={name}
          className="w-12 2xl:w-16 rounded-[50%]"
        />
      </div>
      <section className="text-left pl-3">
        <h3 className="text-text-default-gray text-md 2xl:text-lg">
          {description}
        </h3>
        <h4 className="font-optician-sans text-sm 2xl:text-lg text-property-name-grey tracking-[2px]">
          {name}
        </h4>
      </section>
    </button>
  );
}
