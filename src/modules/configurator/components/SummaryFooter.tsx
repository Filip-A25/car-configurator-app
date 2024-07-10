import { UserCarConfiguration } from "../types";
import { PriceDisplay } from "./PriceDisplay";
import { createUserConfiguration } from "../services";
import { useRecoilValue } from "recoil";
import { userState } from "../../authentification/state";
import { notifyCreate } from "../utilities/utils";
import { configuratorRoutes } from "./const";
import { useNavigate } from "react-router-dom";

export function SummaryFooter({
  userConfiguration,
}: {
  userConfiguration: UserCarConfiguration;
}) {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleOnClick = async () => {
    if (!user) throw new Error("User could no tbe found.");
    try {
      await createUserConfiguration(userConfiguration, user.id);
      notifyCreate();
      navigate(configuratorRoutes.configurations);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <div className="h-[50px] sm:h-[70px] bg-light-gray-element-color border-t border-input-border-gray flex justify-between items-center">
      <section className="flex justify-between text-lg sm:text-2xl 3xl:text-3xl text-text-default-gray px-5">
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
          className="flex justify-center items-center bg-button-purple text-basic-white h-full px-24"
        >
          Save your configuration
        </button>
      </section>
    </div>
  );
}
