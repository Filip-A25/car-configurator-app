import { OptionsDropdownItem } from "./OptionsDropdownItem";
import { useOptionsDropdown } from "../hooks";

export interface OptionsDropdownProps {
  id: string;
  setIsOptionsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function OptionsDropdown({
  id,
  setIsOptionsDropdownOpen,
}: OptionsDropdownProps) {
  const { handleDeleteClick, handleEditConfigurationNavigate } =
    useOptionsDropdown({ id, setIsOptionsDropdownOpen });

  return (
    <ul className="shadow-dropdown-shadow absolute max-md:right-10 max-md:top-4 right-0">
      <OptionsDropdownItem
        title="Edit configuration"
        onClick={handleEditConfigurationNavigate}
      />
      <OptionsDropdownItem title="Delete" onClick={handleDeleteClick} />
    </ul>
  );
}
