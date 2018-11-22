import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import NavBar from "./NavBar";
import AppStore from "../../reflux/application/AppStore";
import appActions from "../../reflux/application/appActions";
import ToolbarContent from "./ToolbarContent";
import Typography from "@material-ui/core/Typography/Typography";
import classNames from "classnames";

const drawerWidth = 190;

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
        padding: theme.spacing.unit * 3,
    },
});

class ResponsiveDrawer extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
    }
    handleDrawerToggle = () => {
        appActions.toggleMenu();
    };
    render() {
        const { classes, children, dropdown } = this.props;

        return (
            <div className = { classes.root }>
                <AppBar position = "fixed" className = { classes.appBar } color = "primary">
                    <Toolbar>
                        <IconButton
                            color = "inherit"
                            aria-label = "Open drawer"
                            onClick = { this.handleDrawerToggle }
                            className = { classes.menuButton }
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant = "title"
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
                            container = { this.props.container }
                            variant = "temporary"
                            anchor = "left"
                            open = { this.state.openMenu }
                            onClose = { this.handleDrawerToggle }
                            classes = { {
                                paper: classes.drawerPaper,
                            } }
                            ModalProps = { {
                                keepMounted: true, // Better open performance on mobile.
                            } }
                        >
                            <NavBar dropdown = { dropdown }/>
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
                            <NavBar dropdown = { dropdown }/>
                        </Drawer>
                    </Hidden>
                </nav>
                <main className = { classes.content }>
                    { children }
                </main>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
