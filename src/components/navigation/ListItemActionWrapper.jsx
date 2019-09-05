import React, {useContext} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon/Icon";
import storage from "../../services/storage";
import PropTypes from "prop-types";
import {AppContext} from "../../context/AppContextProvider";

const ListItemActionWrapper = props => {

    const handleClick = () => {
        storage.set("location", location);
        setGroup(null);
        setLocation(location);
        if (openMenu) toggleMenu();
    };

    const { classes, icon, name:location } = props;
    const { openMenu, setGroup, setLocation, toggleMenu } = useContext(AppContext);

    return (
        <ListItem
            button
            onClick = { handleClick }
            className = { classes.nested }
        >
            <Icon className = { classes.icon }  >
                { icon}
            </Icon>
            <ListItemText secondary = { location } />
        </ListItem>
    );
};

ListItemActionWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

ListItemActionWrapper.contextType = AppContext;

export default ListItemActionWrapper;