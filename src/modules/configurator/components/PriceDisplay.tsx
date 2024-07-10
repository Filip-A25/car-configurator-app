import { useRecoilValue } from "recoil";
import { configurationStringPriceState } from "../state";

export function PriceDisplay() {
  const displayPrice = useRecoilValue(configurationStringPriceState);

  return (
    <section className="flex justify-between items-end max-sm:pt-2 px-5">
      <span className="flex items-center">
        <h4 className="tracking-widest text-muted-grey text-xs md:text-md lg:text-lg 3xl:text-2xl">
          TOTAL
        </h4>
        <div className="relative hover:after:content-['Total_configuration_price.'] hover:after:absolute max-sm:after:top-[-60%] 2xl:after:top-[-50%] 3xl:after:top-[-25%] max-sm:hover:after:leading-0 sm:hover:after:leading-8 max-sm:hover:after:left-8 sm:hover:after:left-10 hover:after:rounded-md max-sm:hover:after:h-6 sm:hover:after:h-8 hover:after:w-52 hover:after:text-center hover:after:opacity-90 hover:after:bg-muted-grey hover:after:text-basic-white">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-2 w-3 h-3 sm:w-4 sm:h-4 3xl:w-5 3xl:h-5"
          >
            <path
              d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM9 12H7V7H9V12ZM8 6C7.4 6 7 5.6 7 5C7 4.4 7.4 4 8 4C8.6 4 9 4.4 9 5C9 5.6 8.6 6 8 6Z"
              fill="#9898F0"
            />
          </svg>
        </div>
      </span>
      <span className="text-md md:text-xl lg:text-2xl 3xl:text-3xl text-text-default-gray">
        {displayPrice} €
      </span>
    </section>
  );
}
