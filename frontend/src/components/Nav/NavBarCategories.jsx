import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

function NavBarCategories() {
  const categories = [
    {
      name: "Category 1",
      links: [
        { name: "Link 1", url: "#" },
        { name: "Link 2", url: "#" },
        { name: "Link 3", url: "#" },
      ],
    },
    {
      name: "Category 2",
      links: [
        { name: "Link 4", url: "#" },
        { name: "Link 5", url: "#" },
        { name: "Link 6", url: "#" },
      ],
    },
    {
      name: "Category 3",
      links: [
        { name: "Link 7", url: "#" },
        { name: "Link 8", url: "#" },
        { name: "Link 9", url: "#" },
      ],
    },
    {
      name: "Category 4",
      links: [
        { name: "Link 10", url: "#" },
        { name: "Link 11", url: "#" },
        { name: "Link 12", url: "#" },
      ],
    },
    {
      name: "Category 5",
      links: [
        { name: "Link 13", url: "#" },
        { name: "Link 14", url: "#" },
        { name: "Link 15", url: "#" },
      ],
    },
  ];

  return (
    <div className="w-full border-b bg-stone-500/25  border-gray-300 py-3">
      <div className="mx-auto max-w-7xl px-4">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            {categories.map((category) => (
              <NavigationMenuItem key={category.name}>
                <NavigationMenuTrigger className="text-gray-700 hover:text-black font-medium cursor-pointer">
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-xl shadow-lg bg-white p-4 min-w-[200px]">
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link.name}>
                        <NavigationMenuLink asChild>
                          <NavLink
                            to={link.url}
                            className="block rounded-lg px-3 py-2 text-sm text-gray-600 w-full hover:bg-gray-100 hover:text-black transition"
                          >
                            {link.name}
                          </NavLink>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

export default NavBarCategories;
