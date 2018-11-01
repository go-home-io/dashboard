import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Icon from "@material-ui/core/Icon/Icon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ExpandLess from "@material-ui/core/SvgIcon/SvgIcon";
import ExpandMore from "@material-ui/core/SvgIcon/SvgIcon";
import Collapse from "@material-ui/core/Collapse/Collapse";
import List from "@material-ui/core/List/List";
import ListItemActionWrapper from "./ListItemActionWrapper";
import React from "react";
import PropTypes from "prop-types";

const LocationDropdown = (props) => {
    const { classes, icon, handleClick,  open, name, items } = props;
    return (
        <div>
            <ListItem
                button
                onClick = { handleClick }
            >
                <ListItemIcon>
                    <Icon>
                        { icon }
                    </Icon>
                </ListItemIcon>
                <ListItemText inset primary = { name } />
                { open ?
                    <ExpandLess className = { classes.expand }/> :
                    <ExpandMore className = { classes.expand }/>
                }
            </ListItem>

            <Collapse in = { open } timeout = "auto" unmountOnExit >
                <List component = "nav" disablePadding dense>
                    { items.map( item => {
                        return (
                            <ListItemActionWrapper
                                key = { item.name }
                                classes = { classes }
                                name = { item.name }
                                icon = { item.icon }
                            />
                        );
                    })
                    }
                </List>
            </Collapse>
        </div>
    );
};

LocationDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

export default LocationDropdown;