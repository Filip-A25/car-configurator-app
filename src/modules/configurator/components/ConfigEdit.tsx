import { ConfigNavbar } from "./ConfigNavbar";
import { ConfigSidebar } from "./ConfigSidebar";
import { ConfigSidebarSelect } from "./ConfigSidebarSelect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { PaginationButton } from "../../../shared";
import { IconDirection } from "../../../shared/types";
import { useConfigEdit } from "../hooks";

export function ConfigEdit() {
  const {
    configurations,
    configImages,
    isDropdownOpen,
    activeDropdownName,
    paginationBackRef,
    paginationNextRef,
  } = useConfigEdit();

  return (
    <section className="relative">
      <ConfigNavbar
        model={configurations?.model}
        productionYear={configurations?.productionYear}
      />
      <div>
        <section className="relative flex min-h-[calc(100vh-140px)]">
          <div className="flex items-center w-[20%] xl:min-w-[calc(100%-400px)] 2xl:min-w-[calc(100%-500px)]">
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
