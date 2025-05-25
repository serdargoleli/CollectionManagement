"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={`layout-page ${open ? "" : "sidebar-closed"}`}>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <div className="main-content">
        <Header />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
