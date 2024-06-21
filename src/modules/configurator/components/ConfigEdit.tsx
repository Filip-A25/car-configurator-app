import { useEffect, useState, useRef } from "react";
import { ConfigNavbar } from "./ConfigNavbar";
import { currentConfigurations, userConfiguration } from "../state/carState";
import { useRecoilState } from "recoil";
import { ConfigSidebar } from "./ConfigSidebar";
import {
  fetchCarConfigurations,
  fetchCarImagesByColorAndVariant,
} from "../../../services/API_configurations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { PaginationButton } from "../../../shared";
import { IconDirection } from "../../../shared/types";

export function ConfigEdit() {
  const [configurations, setConfigurations] = useRecoilState(
    currentConfigurations
  );
  const [currentUserConfiguration, setCurrentUserConfiguration] =
    useRecoilState(userConfiguration);
  const [configImages, setConfigImages] = useState<string[]>();

  const paginationBackRef = useRef(null);
  const paginationNextRef = useRef(null);

  useEffect(() => {
    handleCarConfigurationsFetch("8fYqUodzXUKYFVMYtUnJ");
    handleCarImageFetch();
  }, []);

  const handleCarImageFetch = async () => {
    try {
      const photos = await fetchCarImagesByColorAndVariant(
        "Audi RS5",
        "tango_red",
        1
      );

      setConfigImages(photos);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleCarConfigurationsFetch = async (id: string) => {
    try {
      const response = await fetchCarConfigurations(id);

      setConfigurations(response);

      setCurrentUserConfiguration({
        model: response.model,
        productionYear: response.productionYear,
        color: response.colors[0],
        wheelVariant: response.wheelVariants[0],
        interiorVariant: response.interiorVariants[0],
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <>
      <ConfigNavbar
        model={configurations?.model}
        productionYear={configurations?.productionYear}
      />
      <div>
        <section className="flex min-h-[calc(100vh-140px)] relative">
          <div className="md:pt-36 lg:pt-28 2xl:pt-24 w-[20%] min-w-[calc(100%-300px)]">
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
              {configImages &&
                configImages.length > 0 &&
                configImages?.map((imgUrl, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={imgUrl}
                      alt={configurations?.model}
                      className="md:py-16"
                    />
                  </SwiperSlide>
                ))}
              <div className="flex justify-center items-center">
                <div className="flex items-center text-text-default-gray text-2xl">
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
          </div>
          <ConfigSidebar />
        </section>
      </div>
    </>
  );
}
