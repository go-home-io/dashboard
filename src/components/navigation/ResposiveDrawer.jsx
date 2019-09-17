import React, {useContext} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import NavBar from "./NavBar";
import ToolbarContent from "./ToolbarContent";
import Typography from "@material-ui/core/Typography/Typography";
import classNames from "classnames";
import {AppContext} from "../../context/AppContextProvider";

const drawerWidth = 250;

const styles = theme => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("md")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        height: 64,
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    brand: {
        width: "30%",
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

const ResponsiveDrawer = props =>  {

    const { classes, children, container, logsAvailable, ...other } = props;
    const { toggleMenu, openMenu } = useContext(AppContext);

    return (
        <div className = { classes.root }>
            <AppBar className = { classes.appBar } >
                <Toolbar>
                    <IconButton
                        color = "inherit"
                        aria-label = "Open drawer"
                        onClick = { () => toggleMenu() }
                        className = { classes.menuButton }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant = "h6"
                        color = "inherit"
                        className = { classNames(classes.menuButton, classes.brand) }
                    >
                        GO-HOME
                    </Typography>

                    <ToolbarContent/>

                </Toolbar>
            </AppBar>
            <nav className = { classes.drawer } >
                <Hidden mdUp implementation = "css">
                    <Drawer
                        container = { container }
                        variant = "temporary"
                        anchor = "left"
                        open = { openMenu }
                        onClose = { () => toggleMenu() }
                        classes = { {
                            paper: classes.drawerPaper,
                        } }
                        ModalProps = { {
                            keepMounted: true, // Better open performance on mobile.
                        } }
                    >
                        <NavBar logsAvailable = { logsAvailable } { ...other }/>
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation = "css">
                    <Drawer
                        classes = { {
                            paper: classes.drawerPaper,
                        } }
                        variant = "permanent"
                        open
                    >
                        <NavBar { ...other }/>
                    </Drawer>
                </Hidden>
            </nav>
            <main className = { classes.content } { ...other }>
                { children }
            </main>
        </div>
    );
};

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ResponsiveDrawer);
