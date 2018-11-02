import React from "react";
import Reflux from "reflux";
import WebSocketStore from "../../reflux/socket/WebSocketStore";
import Location from "../location/Location";
import storage from "../../services/storage";
import appActions from "../../reflux/application/appActions";
import locationActions from "../../reflux/location/locationActions";
import Layout from "./Layout";
import PropTypes from "prop-types";

class DevicePage extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = WebSocketStore;
    }
    componentDidMount () {
        // Restore active location from local storage and make it visible
        let active_location = storage.get("location");
        active_location = active_location ? active_location : "Default";
        locationActions.visible(active_location);
        appActions.setLocation(active_location);

        // Set UOM scheme to AppStore
        appActions.setUOM(this.props.generalState.uom);
    }
    render () {
        const { generalState } = this.props;
        const { locations } = generalState;
        const dropdownInfo = {
            name: "Locations",
            icon: "edit_location",
            items: locations,
        };

        return (
            <Layout dropdown = { dropdownInfo }>
                { locations.map( (location) => {
                    return (
                        <Location
                            key = { location.name }
                            location = { location }
                            generalState = { generalState }
                        />
                    );
                })}
            </Layout>
        );
    }
}

DevicePage.propTypes = {
    generalState: PropTypes.object.isRequired
};

export default (DevicePage);