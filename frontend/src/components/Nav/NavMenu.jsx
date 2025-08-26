import { Menubar, MenubarShortcut } from "@/components/ui/menubar";
import MenuBarItem from "./MenuBarItem";

function NavMenu() {
  return (
    <Menubar className="bg-stone-500 border-none text-white">
      {/* Campaigns */}
      <MenuBarItem
        trigger="Campaigns"
        menuItems={[
          { item: "Create Campaign", navigate: "create-campaign" },
          { item: "View Campaigns", navigate: "/view-campaigns" },
          { item: "Manage Campaigns", navigate: "/manage-campaigns" },
          { item: "Campaign Reports", navigate: "/campaign-reports" },
        ]}
      />

      {/* Users */}
      <MenuBarItem
        trigger="Users"
        menuItems={[
          { item: "Donors", navigate: "/users/donors" },
          { item: "Beneficiaries", navigate: "/users/beneficiaries" },
          { item: "Admins", navigate: "/users/admins" },
          { item: "Manage Users", navigate: "/users/manage" },
        ]}
      />

      {/* Donations */}
      <MenuBarItem
        trigger="Donations"
        menuItems={[
          { item: "Make a Donation", navigate: "/donations/make" },
          { item: "Donation History", navigate: "donation-history" },
          { item: "Track Donations", navigate: "/donations/track" },
        ]}
      />

      {/* Profile */}
      <MenuBarItem
        trigger="Profile"
        menuItems={[
          { item: "View Profile", navigate: "/profile/view" },
          { item: "Edit Profile", navigate: "/profile/edit" },
          {
            item: (
              <span key="logout">
                Logout <MenubarShortcut>⌘Q</MenubarShortcut>
              </span>
            ),
            navigate: "/logout",
          },
        ]}
      />
    </Menubar>
  );
}

export default NavMenu;
