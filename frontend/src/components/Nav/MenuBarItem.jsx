import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useNavigate } from "react-router-dom";

function MenuBarItem({ trigger, menuItems }) {
  const navigate = useNavigate();

  return (
    <MenubarMenu>
      <MenubarTrigger className="text-md cursor-pointer font-semibold">
        {trigger}
      </MenubarTrigger>
      <MenubarContent className="flex flex-col gap-1 text-md p-2">
        {menuItems &&
          menuItems.map(({ item, navigate: path }, idx) => (
            <MenubarItem
              key={idx}
              onClick={() => path && navigate(path)}
              className="text-md cursor-pointer px-2 py-1 hover:bg-slate-200 hover:text-black rounded"
            >
              {item}
            </MenubarItem>
          ))}
      </MenubarContent>
    </MenubarMenu>
  );
}

export default MenuBarItem;
