import { UserCarConfiguration, UpdateConfigurationProps } from "../types";
import { PriceDisplay } from "./PriceDisplay";
import { createUserConfiguration, updateUserConfiguration } from "../services";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../authentification/state";
import { activePageState, pageState, userConfigurationState } from "../state";
import { notifyCreate, notifyUpdate } from "../utilities/utils";
import { configuratorRoutes } from "./const";
import { useNavigate } from "react-router-dom";
import { PageLoading } from "../../global/components";

export function SummaryFooter() {
  const user = useRecoilValue(userState);
  const setFirstPageActive = useSetRecoilState(activePageState);
  const pages = useRecoilValue(pageState);
  const userConfiguration = useRecoilValue(userConfigurationState);
  const navigate = useNavigate();

  const handleConfigurationUpdate = async (data: UpdateConfigurationProps) => {
    try {
      await updateUserConfiguration(data);
      setFirstPageActive(pages[0]);
      notifyUpdate();
      navigate(configuratorRoutes.configurations);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleConfigurationCreate = async (
    configuration: UserCarConfiguration,
    userId: string
  ) => {
    try {
      await createUserConfiguration(configuration, userId);
      setFirstPageActive(pages[0]);
      notifyCreate();
      navigate(configuratorRoutes.configurations);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleOnClick = async () => {
    if (!user || !userConfiguration) throw new Error("Insufficient data.");
    if (!userConfiguration.id)
      return handleConfigurationCreate(userConfiguration, user.id);
    const requestData: UpdateConfigurationProps = {
      configuration: userConfiguration,
      userId: user.id,
      configId: userConfiguration.id,
    };
    handleConfigurationUpdate(requestData);
  };

  if (!userConfiguration) return <PageLoading />;

  return (
    <div className="h-[50px] sm:h-[70px] bg-light-gray-element-color border-t border-input-border-gray flex justify-between items-center">
      <section className="flex justify-between text-lg sm:text-lg lg:text-2xl 3xl:text-3xl text-text-default-gray px-5">
        <h3 className="max-sm:hidden text-muted-grey font-optician-sans px-2">
          {userConfiguration.productionYear}
        </h3>
        <h3 className="max-sm:hidden font-optician-sans px-2">
          {userConfiguration.model}
        </h3>
      </section>
      <section className="flex items-center h-full">
        <PriceDisplay />
        <button
          onClick={handleOnClick}
          className="flex justify-center items-center bg-button-purple text-basic-white text-xs lg:text-lg h-full px-24"
        >
          Save your configuration
        </button>
      </section>
    </div>
  );
}
