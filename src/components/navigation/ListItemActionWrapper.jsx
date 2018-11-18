import React from "react";
import Reflux from "reflux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon/Icon";
import locationActions from "../../reflux/location/locationActions";
import AppStore from "../../reflux/application/AppStore";
import appActions from "../../reflux/application/appActions";
import storage from "../../services/storage";
import PropTypes from "prop-types";

class ListItemActionWrapper extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick () {
        const { name: location } = this.props;
        locationActions.visible(location);
        storage.set("location", location);
        appActions.setLocation(location);
        if (this.state.openMenu) {
            appActions.toggleMenu();
        }
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
                <ListItemText inset secondary = { name } />
            </ListItem>
        );
    }
}

ListItemActionWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default ListItemActionWrapper;