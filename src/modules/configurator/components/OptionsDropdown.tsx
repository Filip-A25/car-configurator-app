import { OptionsDropdownItem } from "./OptionsDropdownItem";
import { useOptionsDropdown } from "../hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <ul className="shadow-dropdown-shadow absolute max-sm:right-10 max-sm:top-4 right-0">
      <OptionsDropdownItem
        title="Edit configuration"
        onClick={handleEditConfigurationNavigate}
      />
      <OptionsDropdownItem title="Delete" onClick={handleDeleteClick} />
      <ToastContainer />
    </ul>
  );
}
