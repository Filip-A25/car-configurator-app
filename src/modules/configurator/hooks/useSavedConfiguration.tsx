import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userConfigurationsState } from "../state";
import { Timestamp } from "firebase/firestore";
import { CarImageFetchProps, CarModel, CarPosition } from "../types";
import { fetchCarImageByColorAndVariant } from "../services";
import { format } from "date-fns";

interface Props {
  name: CarModel;
  colorLabel: string;
  wheelsLabel: number;
  creationDate: Timestamp;
}

export function useSavedConfiguration({
  name,
  colorLabel,
  wheelsLabel,
  creationDate,
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

  const displayDate = format(creationDate.toDate(), "PPP").split(",");

  return {
    imgUrl,
    isOptionsDropdownOpen,
    setIsOptionsDropdownOpen,
    displayDate,
  };
}
