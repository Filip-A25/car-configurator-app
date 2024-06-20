import { useEffect, useState, useRef } from "react";
import { ConfigNavbar } from "./ConfigNavbar";
import { currentConfiguration } from "../state/carState";
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
  const [configuration, setConfiguration] =
    useRecoilState(currentConfiguration);
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

      setConfiguration(response);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <>
      <ConfigNavbar
        model={configuration?.model}
        productionYear={configuration?.productionYear}
      />
      <div>
        <section className="flex h-[calc(100vh-130px)] relative">
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
                      alt={configuration?.model}
                      className="py-40"
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
