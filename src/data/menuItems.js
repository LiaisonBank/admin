import {
  Gauge,
  UsersThree,
  Gear,
  Newspaper,
  UserCircle
} from "@phosphor-icons/react";

export const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Gauge,
  },
  {
    label: "Users",
    path: "/users",
    icon: UsersThree,
  },
  {
    label: "CEO Desk",
    path: "/ceodesk",
    icon: UserCircle,
  },
  {
    label: "Press Release",
    path: "/press-release",
    icon: Newspaper,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Gear,
  },
];