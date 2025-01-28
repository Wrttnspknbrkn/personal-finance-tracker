import type * as React from "react"
import { AppBar, IconButton, Toolbar, Typography, styled } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { ModeToggle } from "./mode-toggle"

const drawerWidth = 240

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

interface TopBarProps {
  open: boolean
  handleDrawerOpen: () => void
}

export const TopBar: React.FC<TopBarProps> = ({ open, handleDrawerOpen }) => {
  return (
    <AppBarStyled position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Personal Finance Tracker
        </Typography>
        <ModeToggle />
      </Toolbar>
    </AppBarStyled>
  )
}

