import { useRecoilValue } from "recoil";
import { configurationPrice } from "../state";

export function PriceDisplay() {
  const displayPrice = useRecoilValue(configurationPrice);

  return (
    <section className="flex justify-between items-end max-sm:pt-2 px-5">
      <span className="flex items-center">
        <h4 className="tracking-widest text-muted-grey">TOTAL</h4>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-2"
        >
          <path
            d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM9 12H7V7H9V12ZM8 6C7.4 6 7 5.6 7 5C7 4.4 7.4 4 8 4C8.6 4 9 4.4 9 5C9 5.6 8.6 6 8 6Z"
            fill="#9898F0"
          />
        </svg>
      </span>
      <span className="text-2xl text-text-default-gray">{displayPrice} €</span>
    </section>
  );
}
