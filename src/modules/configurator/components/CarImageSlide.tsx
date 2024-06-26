import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useCarImageSlide } from "../hooks";
import { PaginationButton } from "../../../shared";
import { IconDirection } from "../../../shared/types";
import { currentConfigurations } from "../state";
import { useRecoilValue } from "recoil";
import carIcon from "../assets/car-icon.png";

export function CarImageSlide() {
  const { configImages, paginationBackRef, paginationNextRef } =
    useCarImageSlide();

  const configurations = useRecoilValue(currentConfigurations);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      direction="horizontal"
      slidesPerView={1}
      pagination={{
        el: ".swiper-pagination",
        type: "fraction",
      }}
      navigation={{
        prevEl: paginationBackRef.current,
        nextEl: paginationNextRef.current,
      }}
    >
      {configImages && configImages.length > 0 ? (
        configImages.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <img
              src={imgUrl}
              alt={configurations?.model}
              className="pb-8 md:pb-16"
            />
          </SwiperSlide>
        ))
      ) : (
        <img
          src={carIcon}
          alt="Car icom"
          className="animate-pulse w-20 mx-auto md:py-40 opacity-10"
        />
      )}
      <div className="flex justify-center items-center">
        <div className="flex items-center text-text-default-gray text-lg sm:text-2xl">
          <PaginationButton
            direction={IconDirection.back}
            childRef={paginationBackRef}
          />
          <span className="swiper-pagination text-input-border-gray"></span>
          <PaginationButton
            direction={IconDirection.next}
            childRef={paginationNextRef}
          />
        </div>
      </div>
    </Swiper>
  );
}
