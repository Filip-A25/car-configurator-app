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
    <section className="px-5 sm:px-10 md:px-14 2xl:px-24 3xl:px-36 py-2 md:py-3 overflow-x-visible">
      <div className="py-10 sm:py-20 md:py-12">
        <section>
          <SectionHeading
            title="Configure a car"
            text="Pick your favorite model and start configuring."
          />
        </section>
        <section className="mt-12 3xl:pr-64 overflow-x-visible">
          <Swiper
            width={1800}
            slidesPerView={2}
            spaceBetween={40}
            direction="horizontal"
            breakpoints={{
              0: {
                direction: "vertical",
              },
              1024: {
                direction: "horizontal",
                width: 1000,
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1536: {
                width: 1100,
                slidesPerView: 2,
              },
              1920: {
                width: 1800,
              },
            }}
            scrollbar={{ draggable: true }}
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
