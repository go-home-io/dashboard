import React from "react";
import PropTypes from "prop-types";
import getDeviceState from "../utils/getDeviceState";
import Devices from "../common/Devices";

class GroupDevices extends React.Component {
    render () {
        const { members, all_device_states, location, group_id } = this.props;
        return (
            members.map( (dev_id) => {
                const device_state = getDeviceState(dev_id, all_device_states);
                const deviceType = device_state.type;
                return (
                    <Devices
                        key = { dev_id }
                        id = { dev_id }
                        deviceType = { deviceType }
                        device_info = { device_state }
                        location = { location }
                        group_id = { group_id }
                    />
                );
            })
        );
    }
}

GroupDevices.propTypes = {
    location: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    all_device_states: PropTypes.array.isRequired,
    group_id: PropTypes.string.isRequired,
};

export default (GroupDevices);