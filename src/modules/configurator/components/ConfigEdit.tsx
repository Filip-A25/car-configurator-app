import { useEffect, useState, useRef } from "react";
import { ConfigNavbar } from "./ConfigNavbar";
import {
  currentConfigurations,
  userConfiguration,
  dropdownOpen,
  dropdownState,
} from "../state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ConfigSidebar } from "./ConfigSidebar";
import { ConfigSidebarSelect } from "./ConfigSidebarSelect";
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
  const setCurrentUserConfiguration = useSetRecoilState(userConfiguration);
  const [configImages, setConfigImages] = useState<string[]>();
  const isDropdownOpen = useRecoilValue(dropdownOpen);
  const activeDropdownName = useRecoilValue(dropdownState);

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
    <section className="relative">
      <ConfigNavbar
        model={configurations?.model}
        productionYear={configurations?.productionYear}
      />
      <div>
        <section className="relative flex min-h-[calc(100vh-140px)]">
          <div className="flex items-center w-[20%] min-w-[calc(100%-400px)]">
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
                      className="md:pb-16"
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
          {!isDropdownOpen && <ConfigSidebar />}
        </section>
        {isDropdownOpen && (
          <ConfigSidebarSelect propertyName={activeDropdownName} />
        )}
      </div>
    </section>
  );
}
