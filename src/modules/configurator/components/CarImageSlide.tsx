import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useCarImageSlide } from "../hooks";
import { PaginationButton } from "../../../shared";
import { IconDirection } from "../../../shared/types";
import { currentConfigurationsState } from "../state";
import { useRecoilValue } from "recoil";
import carIcon from "../assets/car-icon.png";

export function CarImageSlide() {
  const { configImages, paginationBackRef, paginationNextRef } =
    useCarImageSlide();

  const configurations = useRecoilValue(currentConfigurationsState);

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
      {configImages && Boolean(configImages.length) ? (
        configImages.map((imgUrl, index) => (
          <SwiperSlide key={index} className="swiper-slide-config-edit">
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
          alt="Car ico"
          className="animate-pulse w-20 mx-auto md:py-40 opacity-10"
        />
      )}
      <div className="flex justify-center items-center">
        <div className="flex items-center text-text-default-gray text-lg sm:text-2xl">
          <PaginationButton
            direction={IconDirection.back}
            childRef={paginationBackRef}
            className="max-sm:absolute w-10 py-2 max-sm:left-0 max-sm:top-[50%] max-sm:z-10"
          />
          <span className="swiper-pagination text-input-border-gray" />
          <PaginationButton
            direction={IconDirection.next}
            childRef={paginationNextRef}
            className="max-sm:absolute w-10 py-2 max-sm:right-0 max-sm:top-[50%] max-sm:z-10"
          />
        </div>
      </div>
    </Swiper>
  );
}
