import SectionHeading from "../../../shared/SectionHeading";
import { useRecoilState } from "recoil";
import { carsState } from "../state/carsState";
import { useEffect } from "react";
import { fetchAllCarData } from "../../../services/API_carModel";
import { Car } from "../types/carType";
import CarItem from "./CarItem";

export default function CarSelect() {
  const [carsArray, setCarsState] = useRecoilState(carsState);

  useEffect(() => {
    async function fetchCarsData() {
      try {
        const carsData = await fetchAllCarData();
        if (carsData) setCarsState(carsData);
      } catch (err: any) {
        throw new Error(err);
      }
    }

    fetchCarsData();
  }, []);

  return (
    <section className="cs-horizontal-padding cs-vertical-padding">
      <div className="py-20">
        <section>
          <SectionHeading
            title="Configure a car"
            text="Pick your favorite model and start configuring."
          />
        </section>
        <div className="grid grid-cols-3">
          {carsArray &&
            carsArray.map((car: Car, index) => (
              <CarItem
                key={index}
                model={car.name}
                productionYear={car.productionYear}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
