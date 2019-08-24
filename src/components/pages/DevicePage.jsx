import React from "react";
import Reflux from "reflux";
import WebSocketStore from "../../reflux/socket/WebSocketStore";
import storage from "../../services/storage";
import appActions from "../../reflux/application/appActions";
import PropTypes from "prop-types";
import Layout from "./Layout";
import Grid from "@material-ui/core/Grid";
// import getDeviceState from "../../utils/getDeviceState";
import GroupManager from "../group/GroupManager";
import Devices from "../common/Devices";
import AppStore from "../../reflux/application/AppStore";


const groupMemberDevices = (group_id, groups) => {
    // console.log('group Members', group_id, groups);
    const this_group = groups.find( grp => {
        return grp.id === group_id;
    });
    return this_group.devices;
};


class DevicePage extends Reflux.Component {
    constructor(props){
        super(props);
        this.stores = [AppStore, WebSocketStore];
    }
    componentDidMount () {
        // Restore active location from local storage
        let active_location = storage.get("location");
        active_location = active_location ? active_location : "Default";
        appActions.setLocation(active_location);

        // Set UOM scheme to AppStore
        appActions.setUOM(this.props.generalState.uom);
    }

    isDeviceInActiveLocation = (activeLocationName, locations, dev_id) => {
        const activeLocation = locations.find( location => {
            return location.name === activeLocationName;
        });
        return activeLocation.devices.includes(dev_id);
    };

    // isDeviceGroupMember = (groups, dev_id) => {
    //     groups.map( group => {
    //         console.log(group.devices.includes(dev_id))
    //         if (group.devices.includes(dev_id)) {
    //             return true;
    //         }
    //     });
    //     return false;
    // };

    render () {
        const { generalState } = this.props;
        const { devices, locations, groups } = generalState;
        const { active_location } = this.state;

        const dropdownInfo = {
            name: "Locations",
            icon: "edit_location",
            items: locations,
        };

        return (
            <Layout dropdown = { dropdownInfo }>
                <Grid container justify = 'center' alignItems = 'center'>
                    { devices.map( (device) => {
                        const deviceType = device.type;
                        const visible = this.isDeviceInActiveLocation(active_location, locations, device.id);
                        // const notInGroup = ! this.isDeviceGroupMember(groups, device.id);

                        return(
                            deviceType === "group" ?
                                <GroupManager
                                    key = { device.id }
                                    visible = { visible }
                                    dev_id = { device.id }
                                    members = { groupMemberDevices(device.id, groups) }
                                    device_info = { device }
                                    all_device_states = { devices }
                                />
                                :
                                <Devices
                                    key = { device.id }
                                    deviceType = { deviceType }
                                    visible = { visible }
                                    id = { device.id }
                                    device_info = { device }
                                    // group_id = ""
                                />
                        );})
                    }
                </Grid>
            </Layout>
        );
    }
}

DevicePage.propTypes = {
    generalState: PropTypes.object.isRequired
};

export default (DevicePage);