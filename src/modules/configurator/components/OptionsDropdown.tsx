import { OptionsDropdownItem } from "./OptionsDropdownItem";

export function OptionsDropdown() {
  return (
    <ul className="shadow-dropdown-shadow absolute right-0">
      <OptionsDropdownItem title="Edit configuration" />
      <OptionsDropdownItem title="Delete" />
    </ul>
  );
}
