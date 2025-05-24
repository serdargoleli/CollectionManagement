"use client";

import React from "react";
import {
  Box,
  CSSObject,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";
import { MUISidebarDrawlerProps } from "@/core/models/ui/ISidebarDrawler";

const drawerWidth = 270;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `70px`, // Kapatılınca kalan genişlik, ikonlar gözükür
  [theme.breakpoints.up("sm")]: {
    width: `70px`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

const MUISidebarDrawler: React.FC<MUISidebarDrawlerProps> = ({ menuItems, open, toggleDrawer }) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="py-6">
          {open && (
            <Typography variant="h6" noWrap>
              LOGO
            </Typography>
          )}
          <IconButton onClick={toggleDrawer}>{open ? theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon /> : <MenuIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ overflow: "auto" }}>
          {menuItems.map((group, idx) => (
            <List
              key={idx}
              subheader={
                open ? (
                  <ListSubheader component="div" disableSticky>
                    {group.groupName}
                  </ListSubheader>
                ) : null
              }
            >
              {group.items.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => router.push(item.path)}
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              ))}
            </List>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
};

export default MUISidebarDrawler;
