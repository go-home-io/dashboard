import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ViewListIcon from "@material-ui/icons/ViewList";
import DevicesIcon from "@material-ui/icons/Devices";
import { Link } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemActionWrapper from "./ListItemActionWrapper";
import AppStore from "../../reflux/application/AppStore";
import appActions from "../../reflux/application/appActions";
import Icon from "@material-ui/core/Icon/Icon";

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 195,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 7,
    },
    expand: {
        position: "relative",
        left: 8,
        top:1,
        color:"rgba(0, 0, 0, 0.54)",
    },
    icon: {
        color:"rgba(0, 0, 0, 0.54)"
    }
});

class NavBar extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.store = AppStore;

        this.handleClick = this.handleClick.bind(this);
        this.closeAfterClick = this.closeAfterClick.bind(this);
    }
    handleClick ()  {
        this.setState(state => ({ open: !state.open }));
    }
    closeAfterClick () {
        if (this.state.openMenu) {
            appActions.toggleMenu();
        }
    }
    render() {
        const { classes, source, dropdown } = this.props;
        const { name, icon, items } = dropdown;

        return (
            <div className = { classes.root } >
                <List
                    component = "nav"
                    // subheader = { <ListSubheader component="div">Nested List Items</ListSubheader> }
                >
                    <ListItem
                        button
                        onClick = { this.closeAfterClick }
                        component = { Link }
                        to = { "/" }

                    >
                        <ListItemIcon>
                            <DevicesIcon />
                        </ListItemIcon>
                        <ListItemText inset primary = "Devices" />
                    </ListItem>

                    <ListItem
                        button
                        onClick = { this.closeAfterClick }
                        component = { Link }
                        to = { "/status" }
                    >
                        <ListItemIcon>
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText inset primary = "Status" />
                    </ListItem>
                    { source === "devices" ?
                        <div>
                            <ListItem
                                button
                                onClick = { this.handleClick }
                            >
                                <ListItemIcon>
                                    <Icon>
                                        { icon }
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText inset primary = { name } />
                                { this.state.open ?
                                    <ExpandLess className = { classes.expand }/> :
                                    <ExpandMore className = { classes.expand }/>
                                }
                            </ListItem>

                            <Collapse in = { this.state.open } timeout = "auto" unmountOnExit >
                                <List component = "nav" disablePadding dense>
                                    { items.map( item => {
                                        return (
                                            <ListItemActionWrapper
                                                source = { source }
                                                classes = { classes }
                                                name = { item.name }
                                                icon = { item.icon }
                                                key = { item.name }
                                            />
                                        );
                                    })
                                    }
                                </List>
                            </Collapse>
                        </div> : null
                    }
                </List>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    dropdown: PropTypes.object.isRequired,
    source: PropTypes.string.isRequired
};

export default withStyles(styles)(NavBar);
