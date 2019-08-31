import React from "react";
import Reflux from "reflux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon/Icon";
import AppStore from "../../reflux/application/AppStore";
import storage from "../../services/storage";
import PropTypes from "prop-types";
import {AppContext} from "../../context/AppContextProvider";

class ListItemActionWrapper extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick () {
        const { name: location } = this.props;
        const { openMenu, setGroup, setLocation, toggleMenu } = this.context;
        storage.set("location", location);

        setGroup(null);
        setLocation(location);
        if (openMenu) toggleMenu();
    }
    render () {
        const { classes, icon, name } = this.props;
        return (
            <ListItem
                button
                onClick = { this.handleClick }
                className = { classes.nested }
            >
                <Icon className = { classes.icon }  >
                    { icon}
                </Icon>
                <ListItemText secondary = { name } />
            </ListItem>
        );
    }
}

ListItemActionWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

ListItemActionWrapper.contextType = AppContext;

export default ListItemActionWrapper;