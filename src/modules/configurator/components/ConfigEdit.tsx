import { useEffect } from "react";
import { ConfigNavbar } from "./ConfigNavbar";
import { currentConfiguration } from "../state/carState";
import { useRecoilState } from "recoil";
import { ConfigSidebar } from "./ConfigSidebar";
import { PaginationButton } from "../../../shared";
import { IconDirection } from "../../../shared/types";
import { fetchCarConfigurations } from "../../../services/API_configurations";
import { CarConfigurations } from "../types";

export function ConfigEdit() {
  const [configuration, setConfiguration] =
    useRecoilState(currentConfiguration);

  useEffect(() => {}, []);

  return (
    <>
      <ConfigNavbar
        model={configuration?.model}
        productionYear={configuration?.productionYear}
      />
      <div>
        <section className="flex h-[calc(100vh-130px)]">
          <div className="md:pt-36 lg:pt-28 2xl:pt-24">
            <img
              src="https://s3-alpha-sig.figma.com/img/0996/06d6/7319c098e8adbc918896d457363a0cd9?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KPVzzptS8fkzVYMbBsZks967CCDIRAzJft1Bbv2FjQKCY3NeN7hMU2I9P2U9cowTaHoTPsGxrXtqC4o5bcDV64hNQ5zH5e59rr4PA0ufnLaoV4VvQQX-tn39Ks09gtjuL~iW5~XrfPNi-k6eHdh2PNHqWuE7w90Skj6oSWAehabscP7IFCMfy3t9aR9uOf6dW87Xiu5qt9ROwdni93z-rZc9wOJxyD2934WFvnVgTyt4U3ac9I3e9E39pXklehHbdY7lNPrQwE-zQpNLYAmpgJQfXr99nwwEmorVngKPAgWyubWgT-ZUpAJ97TEiZO6b5vBp1BDYfcEen6QzC83mmQ"
              alt="Car"
              className="lg:px-20 2xl:px-48"
            />
            <div className="flex justify-center items-center">
              <PaginationButton direction={IconDirection.back} />
              <span className="text-text-default-gray">
                1 <span className="text-input-border-gray">/ 5</span>
              </span>
              <PaginationButton direction={IconDirection.next} />
            </div>
          </div>
          <ConfigSidebar />
        </section>
      </div>
    </>
  );
}
