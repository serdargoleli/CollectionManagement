"use client";

import React from "react";
import { IMenuModel } from "@/core/models/ui/IMenuModel";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsIcon from "@mui/icons-material/Collections";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MUISidebarDrawler from "@/components/material-ui/SidebarDrawler";
import { SidebarProps } from "@/core/models/ui/ISidebarDrawler";

const menuItems: IMenuModel[] = [
  {
    groupName: "Ana Sayfa",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
      { name: "Koleksiyonlar", path: "/collections", icon: <CollectionsIcon /> },
      { name: "Ayarlar", path: "/settings", icon: <SettingsIcon /> },
    ],
  },
  {
    groupName: "Satış",
    items: [
      { name: "Siparişler", path: "/orders", icon: <ReceiptLongIcon /> },
      { name: "Müşteriler", path: "/customers", icon: <PeopleAltIcon /> },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open, toggleDrawer }) => {
  return <MUISidebarDrawler menuItems={menuItems} open={open} toggleDrawer={toggleDrawer} />;
};

export default Sidebar;
