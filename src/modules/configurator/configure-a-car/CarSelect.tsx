import SectionHeading from "../../../shared/SectionHeading";
import { useRecoilState } from "recoil";
import { carsState } from "../state/carsState";
import { useEffect } from "react";
import { fetchAllCarData } from "../../../services/API_carModel";
import { Car } from "../types/carType";
import CarItem from "./CarItem";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CarSelect() {
  const [carsArray, setCarsState] = useRecoilState(carsState);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      const carsData = await fetchAllCarData();
      setCarsState([...carsData]);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <section className="cs-horizontal-padding cs-vertical-padding overflow-x-visible">
      <div className="py-20">
        <section>
          <SectionHeading
            title="Configure a car"
            text="Pick your favorite model and start configuring."
          />
        </section>
        <section className="mt-12 3xl:pr-64 overflow-x-visible">
          <Swiper
            slidesPerView={2}
            spaceBetween={40}
            scrollbar={{ draggable: true }}
            className="overflow-x-visible"
          >
            {carsArray &&
              carsArray.map((car: Car, index) => (
                <SwiperSlide key={index}>
                  <CarItem
                    key={index}
                    id={car.id}
                    model={car.name}
                    productionYear={car.productionYear}
                    colors={car.colors}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      </div>
    </section>
  );
}
