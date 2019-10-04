import React, {useContext} from "react";
import PropTypes from "prop-types";
import Layout from "./Layout";
import Grid from "@material-ui/core/Grid";
import {Collapse, Slide} from "@material-ui/core";
import ExpandedGroupHeader from "../group/ExpandedGroupHeader";
import {AppContext} from "../../context/AppContextProvider";
import Devices from "../devices/Devices";

const groupMemberDevices = (group_id, groups) => {
    const this_group = groups.find( grp => {
        return grp.id === group_id;
    });
    return this_group.devices;
};

const DevicePage = props =>{

    const getActiveGroupObject = (devices, activeGroupId) => (
        devices.find( dev => (dev.id === activeGroupId))
    );

    const isDeviceInActiveLocation = (activeLocationName, locations, dev_id) => {
        const activeLocation = locations.find( location => (location.name === activeLocationName));
        return activeLocation ? activeLocation.devices.includes(dev_id) : false;
    };

    const isDeviceInActiveGroup = (groups, activeGroupId, dev_id) => {
        const activeGroup = groups.find( grp => ( grp.id === activeGroupId));
        return activeGroup.devices.includes(dev_id);
    };

    const { generalState, pageVisible, ...other } = props;
    const { devices, locations, groups } = generalState;
    const { active_location, active_group, active_group_on } = useContext(AppContext);

    const dropdownInfo = {
        name: "Locations",
        icon: "edit_location",
        items: locations,
    };

    const isComponentVisible = (dev_id) => {
        if (active_group) {
            return isDeviceInActiveGroup(groups, active_group, dev_id);
        } else {
            return isDeviceInActiveLocation(active_location, locations, dev_id);
        }
    };

    return (
        <Layout dropdown = { dropdownInfo } { ...other }>
            <Collapse in = { Boolean(active_group) }>
                { active_group &&
                    <ExpandedGroupHeader
                        id = { active_group }
                        groupObj = { getActiveGroupObject(devices, active_group) }
                        on = { active_group_on }
                        members = { groupMemberDevices(active_group, groups) }
                    />
                }
            </Collapse>
            <Slide in = { pageVisible } direction = "up" timeout = { {enter: 1500} }>
                <Grid container justify = 'center' alignItems = 'center'>
                    { devices.map( (device) => {
                        const deviceType = device.type;
                        const visible = isComponentVisible(device.id);

                        return(
                            <Devices
                                key = { device.id }
                                deviceType = { deviceType }
                                visible = { visible }
                                id = { device.id }
                                device_info = { device }
                            />
                        );})
                    }
                </Grid>
            </Slide>
        </Layout>
    );
};

DevicePage.propTypes = {
    generalState: PropTypes.object.isRequired,
    pageVisible: PropTypes.bool.isRequired
};

export default (DevicePage);