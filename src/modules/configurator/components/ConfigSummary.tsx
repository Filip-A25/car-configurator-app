import { CarImageSlide } from "./CarImageSlide";
import { useRecoilValue } from "recoil";
import { userConfigurationState, configurationPriceState } from "../state";
import { ConfigPropertyView } from "./ConfigPropertyView";
import { PageLoading } from "../../global/components";

export function ConfigSummary() {
  const configuration = useRecoilValue(userConfigurationState);
  const displayPrice = useRecoilValue(configurationPriceState);

  if (!configuration) return <PageLoading />;

  return (
    <section className="px-32 py-10">
      <div className="px-20 pb-20">
        <CarImageSlide />
      </div>
      <section>
        <div className="flex justify-between w-full">
          <div>
            <h1 className="font-optician-sans text-text-default-gray text-4xl leading-none">
              {configuration?.model}
            </h1>
            <h4 className="font-optician-sans text-text-muted-gray text-xl">
              {configuration?.productionYear}
            </h4>
          </div>
          <span>
            <span className="flex items-center justify-end pb-1">
              <h4 className="tracking-widest text-muted-grey text-xs sm:text-md 3xl:text-lg">
                TOTAL
              </h4>
              <div className="relative hover:after:content-['Total_configuration_price.'] hover:after:absolute max-sm:after:top-[-60%] 2xl:after:top-[-50%] 3xl:after:top-[-25%] max-sm:hover:after:leading-0 sm:hover:after:leading-8 max-sm:hover:after:left-8 sm:hover:after:left-10 hover:after:rounded-md max-sm:hover:after:h-6 sm:hover:after:h-8 hover:after:w-52 hover:after:text-center hover:after:opacity-90 hover:after:bg-muted-grey hover:after:text-basic-white">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-2 w-2 h-2 sm:w-3 sm:h-3 3xl:w-4 3xl:h-4"
                >
                  <path
                    d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM9 12H7V7H9V12ZM8 6C7.4 6 7 5.6 7 5C7 4.4 7.4 4 8 4C8.6 4 9 4.4 9 5C9 5.6 8.6 6 8 6Z"
                    fill="#9898F0"
                  />
                </svg>
              </div>
            </span>
            <span className="text-xl">{displayPrice} €</span>
          </span>
        </div>
        <div className="h-[1px] w-full bg-text-light-grey mt-8 mb-14" />
        <section className="flex justify-between">
          <span className="">Your configuration details</span>
          <div className="basis-[60%]">
            <h4>Exterior</h4>
            <div className="h-[1px] w-full bg-text-light-grey my-8" />
            <ConfigPropertyView
              index={1}
              propertyName="color"
              modelName={configuration.model}
              label={configuration.color.label}
              name="color"
              description={configuration.color.name}
              price={configuration.color.price}
              isDescriptionDisplayed={false}
            />
            <ConfigPropertyView
              index={2}
              propertyName="wheels"
              modelName={configuration.model}
              label={configuration.wheels.label}
              name="wheels"
              description={configuration.wheels.name}
              price={configuration.wheels.price}
            />
            <h4>Interior</h4>
            <div className="h-[1px] w-full bg-text-light-grey my-8" />
            <ConfigPropertyView
              index={3}
              propertyName="color"
              modelName={configuration.model}
              label={configuration.color.label}
              name="wheels"
              description={configuration.color.name}
              price={configuration.color.price}
            />
            <span className="flex justify-between font-bold py-10 text-xl">
              <h4 className="text-text-dark-gray">Total</h4>
              <h4 className="text-text-default-gray">{displayPrice} €</h4>
            </span>
          </div>
        </section>
      </section>
    </section>
  );
}
