import { IMenuModel } from "@/core/models/ui/IMenuModel";

export interface MUISidebarDrawlerProps {
  menuItems: IMenuModel[];
  open: boolean;
  toggleDrawer: () => void;
}

export interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
}
