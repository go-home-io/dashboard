import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ViewListIcon from "@material-ui/icons/ViewList";
import DevicesIcon from "@material-ui/icons/Devices";
import NavBarDropdown from "./NavBarDropdown";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import {blue} from "@material-ui/core/colors";
import storage from "../../services/storage";
import {AppContext} from "../../context/AppContextProvider";

const GREY_COLOR = "rgba(0, 0, 0, 0.54)";

const styles = theme => ({
    root: {
        height: "100%",
        backgroundColor: "rgb(0,0,0,0.02)" //theme.palette.background.paper, //"rgb(0,0,0,0.03)",
    },
    nested: {
        paddingLeft: theme.spacing(7),
    },
    expand: {
        position: "relative",
        left: 8,
        top:1,
        color: GREY_COLOR,
    },
    icon: {
        color: GREY_COLOR
    },
    subheading: {
        height: 64,
        backgroundColor: blue[500],
        color: "#ffffff",
    },
    typography: {
        paddingTop: 18,
        textAlign: "center"
    }
});

const NavBar = props => {
    const [open, setOpen] = useState(false);
    const { classes, dropdown } = props;
    const { name, icon, items } = dropdown ? dropdown :  [];
    const { active_page: page, openMenu, setPage, setGroup, toggleMenu } = useContext(AppContext);

    const handleClick = ()  => {
        setOpen(!open);
    };

    const closeAfterClick = (page) => {
        storage.set("page", page);
        setGroup(null);
        setPage(page);
        if (openMenu) toggleMenu();
    };

    return (
        <div className = { classes.root } >
            <List
                component = "nav"
                subheader = {
                    <ListSubheader
                        component = "div"
                        className = { classes.subheading }
                    >
                        <Typography
                            className = { classes.typography }
                            variant = "h6"
                            color = "inherit"
                        >
                            GO-HOME
                        </Typography>
                    </ListSubheader>
                }
            >
                <Divider/>

                { page === "devices" && items &&
                <NavBarDropdown
                    classes = { classes }
                    icon = { icon }
                    handleClick = { handleClick }
                    open = { open }
                    name = { name }
                    items = { items }
                />
                }
                {page === "status" &&
                    <ListItem
                        button
                        onClick = { () => closeAfterClick("devices") }
                    >
                        <ListItemIcon>
                            <DevicesIcon/>
                        </ListItemIcon>
                        <ListItemText primary = "Devices"/>
                    </ListItem>
                }
                {page === "devices" &&
                    <ListItem
                        button
                        onClick = { () => closeAfterClick("status") }
                    >
                        <ListItemIcon>
                            <ViewListIcon/>
                        </ListItemIcon>
                        <ListItemText primary = "Status"/>
                    </ListItem>
                }
            </List>
        </div>
    );
};

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    dropdown: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
