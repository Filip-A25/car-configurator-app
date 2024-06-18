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
import { Navigation } from "swiper/modules";

export function ConfigEdit() {
  const [configuration, setConfiguration] =
    useRecoilState(currentConfiguration);
  const [configImages, setConfigImages] = useState<string[]>();

  const paginationBackRef = useRef(null);
  const paginationNextRef = useRef(null);
  const paginationFractionRef = useRef(null);

  useEffect(() => {
    handleCarConfigurationsFetch("8fYqUodzXUKYFVMYtUnJ");
    handleCarImageFetch();
  }, []);

  const handleCarImageFetch = async () => {
    try {
      if (!configuration) return;

      const colorIndex = Math.floor(
        Math.random() * configuration.colors.length
      );
      const wheelIndex = Math.floor(
        Math.random() * configuration.wheelVariants.length
      );

      const photos = await fetchCarImagesByColorAndVariant(
        configuration.model,
        configuration.colors[colorIndex],
        configuration.wheelVariants[wheelIndex]
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
          <div className="md:pt-36 lg:pt-28 2xl:pt-24 w-[20%]">
            <Swiper
              modules={[Navigation]}
              direction={"horizontal"}
              slidesPerView={1}
              pagination={{
                el: paginationFractionRef.current,
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
                    <img src={imgUrl} alt={configuration?.model} />
                  </SwiperSlide>
                ))}
              <div className="flex justify-center items-center">
                <span className="text-text-default-gray">
                  <button className="w-[24px] h-[24px]" ref={paginationBackRef}>
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.86858 0.162141C7.05517 0.3657 7.04142 0.681984 6.83786 0.86858L1.23995 6L6.83786 11.1314C7.04142 11.318 7.05517 11.6343 6.86858 11.8379C6.68198 12.0414 6.3657 12.0552 6.16214 11.8686L0.162138 6.36858C0.0588232 6.27387 0 6.14016 0 6C0 5.85985 0.0588232 5.72613 0.162138 5.63143L6.16214 0.131426C6.3657 -0.0551703 6.68198 -0.0414189 6.86858 0.162141Z"
                        fill="#2E2E38"
                      />
                    </svg>
                  </button>
                  <span ref={paginationFractionRef}></span>
                  <button className="w-[24px] h-[24px]" ref={paginationNextRef}>
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.131426 0.162141C-0.0551704 0.3657 -0.0414189 0.681984 0.162141 0.86858L5.76006 6L0.162141 11.1314C-0.0414189 11.318 -0.0551704 11.6343 0.131426 11.8379C0.318022 12.0414 0.634306 12.0552 0.837866 11.8686L6.83787 6.36858C6.94118 6.27387 7 6.14016 7 6C7 5.85985 6.94118 5.72613 6.83787 5.63143L0.837866 0.131426C0.634306 -0.0551703 0.318022 -0.0414189 0.131426 0.162141Z"
                        fill="#2E2E38"
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </Swiper>
          </div>
          <ConfigSidebar />
        </section>
      </div>
    </>
  );
}
