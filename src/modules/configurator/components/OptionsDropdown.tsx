import { OptionsDropdownItem } from "./OptionsDropdownItem";
import { deleteUserConfiguration } from "../services";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  modelId: string;
}

export function OptionsDropdown({ id, modelId }: Props) {
  const navigate = useNavigate();

  const handleConfigurationDelete = async () => {
    try {
      const response = await deleteUserConfiguration(id);
      console.log(response);
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
