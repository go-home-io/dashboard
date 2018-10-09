import React from "react";
import Reflux from "reflux";
import Grid from "@material-ui/core/Grid/Grid";
import GroupManager from "../group/GroupManager";
import getDeviceState from "../utils/getDeviceState";
import LocationStoreFactory from "../../reflux/location/LocationStore";
import PropTypes from "prop-types";
import Devices from "../common/Devices";

const groupMemberDevices = (group_id, groups) => {
    const this_group = groups.find(function (grp) {
        return grp.id === group_id;
    });
    return this_group.devices;
};


class Location extends Reflux.Component {
    constructor(props) {
        super(props);
        const { name, devices } = props.location;
        this.store = LocationStoreFactory(name, devices);
    }

    render () {
        const {name: location, devices} = this.props.location;
        const generalState = this.props.generalState;

        return (
            <Grid container justify = 'center' alignItems = 'center'>
                { devices.map( (device) => {
                    const device_info = getDeviceState(device, generalState.devices);
                    const deviceType = device_info.type;

                    return(
                        deviceType === "group" ?
                            <GroupManager
                                key = { device }
                                location = { location }
                                dev_id = { device }
                                members = { groupMemberDevices(device, generalState.groups) }
                                device_info = { device_info }
                                all_device_states = { generalState.devices }
                            />
                            :
                            <Devices
                                key = { device }
                                deviceType = { deviceType }
                                location = { location }
                                id = { device }
                                device_info = { device_info }
                                group_id = ""
                            />
                    );})
                }
            </Grid>
        );
    }
}

Location.propTypes = {
    location: PropTypes.object.isRequired,
    generalState: PropTypes.object.isRequired
};

export default (Location);