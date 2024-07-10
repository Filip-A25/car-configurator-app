import { ButtonHTMLAttributes } from "react";
import { useConfigProperty } from "../hooks";
import { CarPropertyName, CarModel } from "../types";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  index: number;
  propertyName: CarPropertyName;
  label: string | number;
  name: string;
  description: string;
  price: number;
  modelName?: CarModel;
  isDescriptionDisplayed?: boolean;
}

export function ConfigProperty({
  index,
  propertyName,
  modelName,
  label,
  name,
  description,
  price,
  isDescriptionDisplayed,
  disabled,
}: Props) {
  const {
    handleOpenDropdown,
    propertyImgUrl,
    activePropIndex,
    propertyTypeName,
  } = useConfigProperty({
    index,
    propertyName,
    modelName,
    label,
    name,
    description,
    price,
  });

  return (
    <button
      className="flex items-center p-2 xs:p-4 sm:p-5 sm:pr-40 lg:pr-48 3xl:pr-64"
      onClick={handleOpenDropdown}
      disabled={disabled}
    >
      <div className="relative overflow-hidden aspect-square h-[36px] sm:h-[60px]">
        {propertyImgUrl ? (
          <img
            src={propertyImgUrl}
            alt={name}
            className=" w-full h-full object-cover rounded-[50%] object-left"
          />
        ) : (
          <div className="w-12 2xl:w-14 h-12 2xl:h-14 bg-light-gray-background-color rounded-[50%] animate-pulse" />
        )}
        {!disabled && activePropIndex[propertyName] === index && (
          <div className="absolute right-0 bottom-0 bg-checkmark-green w-3 h-3 sm:w-5 sm:h-5 rounded-[50%] flex justify-center items-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.99998 10.9996C3.73479 10.9995 3.48047 10.8941 3.29298 10.7066L0.29298 7.70657C0.110822 7.51797 0.0100274 7.26537 0.0123059 7.00317C0.0145843 6.74098 0.119753 6.49016 0.305161 6.30476C0.490569 6.11935 0.741382 6.01418 1.00358 6.0119C1.26578 6.00962 1.51838 6.11042 1.70698 6.29258L3.90698 8.49257L10.21 0.385575C10.3728 0.176054 10.6122 0.0398036 10.8755 0.00679716C11.1388 -0.0262092 11.4045 0.0467322 11.614 0.209575C11.8235 0.372418 11.9598 0.611823 11.9928 0.875124C12.0258 1.13843 11.9528 1.40405 11.79 1.61357L4.78998 10.6136C4.70302 10.7259 4.59312 10.8185 4.46759 10.885C4.34206 10.9516 4.20378 10.9906 4.06198 10.9996H3.99998Z"
                fill="#FCFCFD"
              />
            </svg>
          </div>
        )}
      </div>
      <section className="text-left pl-3">
        <h3 className="text-text-default-gray text-sm sm:text-md 2xl:text-lg 3xl:text-xl">
          {description}
        </h3>
        {isDescriptionDisplayed && (
          <h4 className="font-optician-sans text-xs sm:text-sm 2xl:text-md 3xl:text-lg text-property-name-grey tracking-[2px]">
            {propertyTypeName}
          </h4>
        )}
      </section>
    </button>
  );
}
