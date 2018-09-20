import React from "react";
import Reflux from "reflux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon/Icon";
import locationActions from "../../reflux/location/locationActions";
import AppStore from "../../reflux/application/AppStore";
import appActions from "../../reflux/application/appActions";
import storage from "../../services/storage";


class ListItemActionWrapper extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick () {
        locationActions.visible(this.props.location);
        storage.set("location", this.props.location);
        appActions.setLocation(this.props.location);
        if (this.state.openMenu) {
            appActions.toggleMenu();
        }
    }

    render () {
        return (
            <ListItem button
                onClick = { this.handleClick }
                className = { this.props.classes }
            >

                <Icon style = { {color:"gray"} }>
                    {this.props.icon}
                </Icon>
                <ListItemText inset primary = { this.props.location } />
            </ListItem>
        );
    }

}

export default ListItemActionWrapper;