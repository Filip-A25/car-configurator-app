import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userConfigurationsState } from "../state";
import { Timestamp } from "firebase/firestore";
import { monthNames } from "../components/const";
import { CarImageFetchProps, CarModel, CarPosition } from "../types";
import { fetchCarImageByColorAndVariant } from "../services";

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

  const nthFormat = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const getDisplayDate = () => {
    const date = creationDate.toDate();

    const daySuffix = nthFormat(date.getDate());
    const displayDate =
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      daySuffix +
      " " +
      date.getFullYear();

    return displayDate;
  };

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

  return {
    imgUrl,
    isOptionsDropdownOpen,
    setIsOptionsDropdownOpen,
    getDisplayDate,
  };
}
