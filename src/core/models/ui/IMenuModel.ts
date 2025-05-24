import { ReactNode } from "react";

export interface IMenuModel {
  groupName: string;
  items: IMenuItem[];
}

export interface IMenuItem {
  name: string;
  path: string;
  icon?: ReactNode;
}
