import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../authentification/state";
import { userConfigurationsState } from "../state";
import { toast } from "react-toastify";
import {
  fetchAllUserConfigurations,
  deleteUserConfiguration,
} from "../services";
import { OptionsDropdownProps } from "../components";
import { toastifySuccessProps } from "../components/const";

export function useOptionsDropdown({
  id,
  setIsOptionsDropdownOpen,
}: OptionsDropdownProps) {
  const user = useRecoilValue(userState);
  const setUserConfigurations = useSetRecoilState(userConfigurationsState);

  const notifyDelete = () => {
    toast.success("Configuration successfully deleted.", toastifySuccessProps);
  };

  const handleUserConfigurationsFetch = async (userId: string) => {
    try {
      const response = await fetchAllUserConfigurations(userId);
      setUserConfigurations(response);
    } catch (err: any) {
      throw Error(err);
    }
  };

  const handleConfigurationDelete = async (userId: string) => {
    try {
      await deleteUserConfiguration(userId, id);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleDeleteClick = async () => {
    if (!user) throw new Error("User could not be found.");
    try {
      await handleConfigurationDelete(user.id);
      await handleUserConfigurationsFetch(user.id);
      setIsOptionsDropdownOpen(false);
      notifyDelete();
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleEditConfigurationNavigate = () => {
    // TODO: This will navigate to a Configuration view/summary once once it's done.
  };

  return { handleDeleteClick, handleEditConfigurationNavigate };
}
