import { OptionsDropdownItem } from "./OptionsDropdownItem";
import { deleteUserConfiguration } from "../services";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../authentification/state";

interface Props {
  id: string;
  modelId: string;
}

export function OptionsDropdown({ id, modelId }: Props) {
  const navigate = useNavigate();
  const userId = useRecoilValue(userState)?.id;

  const handleConfigurationDelete = async () => {
    try {
      if (!userId) throw new Error("User id could not be found.");
      const response = await deleteUserConfiguration(userId, id);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleEditConfigurationNavigate = () => {
    navigate(`/home/configure-a-car/configuration-edit/${modelId}`);
  };

  return (
    <ul className="shadow-dropdown-shadow absolute right-0">
      <OptionsDropdownItem
        title="Edit configuration"
        onClick={handleEditConfigurationNavigate}
      />
      <OptionsDropdownItem title="Delete" onClick={handleConfigurationDelete} />
    </ul>
  );
}
