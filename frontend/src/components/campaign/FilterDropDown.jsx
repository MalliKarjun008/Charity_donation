import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";

function FilterDropDown({ triggerText, label, items }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer hover:scale-105 hover:shadow-md border px-5 py-3 rounded-md flex items-center justify-between gap-5 w-full">
        <h1>{triggerText}</h1>
        <FaChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterDropDown;
