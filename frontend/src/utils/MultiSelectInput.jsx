import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaAngleDown } from "react-icons/fa";

function MultiSelectInput({ options = [], className, setSelected, selected }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="px-3 py-2 flex items-center gap-2 font-medium  text-sm rounded-lg border bg-slate-600 border-none hover:bg-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
        >
          Categories
          <FaAngleDown />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-3 rounded-xl shadow-lg bg-slate-800 border border-slate-700 text-white">
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
          {options.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(item)}
                onChange={() => setSelected(item)}
                className={`h-4 w-4 rounded accent-blue-500 cursor-pointer ${className}`}
              />
              <span className="text-sm">{item}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelectInput };
