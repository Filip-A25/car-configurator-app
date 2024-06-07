import SectionHeading from "../../../shared/SectionHeading";
import { carsState } from "../state/carsState";
import { useRecoilState } from "recoil";
import CarItem from "./CarItem";

export default function CarSelect() {
  const [carsArray] = useRecoilState(carsState);

  return (
    <div className="py-20">
      <section>
        <SectionHeading
          title="Configure a car"
          text="Pick your favorite model and start configuring."
        />
      </section>
      <section>
        {carsArray?.map((car) => (
          <CarItem
            model={car.model}
            productionYear={car.productionYear}
            photo={car.photo}
          />
        ))}
      </section>
    </div>
  );
}
