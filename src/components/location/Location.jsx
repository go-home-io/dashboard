import React from "react";
import Reflux from 'reflux';
import Grid from "@material-ui/core/Grid/Grid";
import GroupManager from "../group/GroupManager";
import getDeviceState from '../utils/getDeviceState';
import LightManager from "../light/LightManager";
import LocationStoreFactory from "../../reflux/location/LocationStore";
import locationActions from "../../reflux/location/locationActions";
import SensorManager from "../sensor/SensorManager";

class Location extends Reflux.Component {
    constructor(props) {
        super(props);

        this.store = LocationStoreFactory(props.location.name, props.location.devices);
    }

    render () {
        const location = this.props.location.name;
        const devices = this.props.location.devices;
        const generalState = this.props.generalState;
        const members = (group_id, groups) => {
                        const this_group = groups.find(function (grp) {
                            return grp.id === group_id;
                        });
                        return this_group.devices;
        };

        return (
                 <Grid container >

                   <Grid container justify='center'>
                     { devices.map( (device, index) => {
                         const device_info = getDeviceState(device, generalState.devices);
                         const deviceType = device_info.type;

                         return(
                                 deviceType === 'group' ?
                                         <GroupManager
                                                 key = {device}
                                                 location = {location}
                                                 dev_id = {device}
                                                 members = {members(device,generalState.groups)}
                                                 device_info = {device_info}
                                                 device_states = {generalState.devices}
                                         /> :
                                 deviceType === 'light' ?
                                        <LightManager
                                             key = {device}
                                             location = {location}
                                             id = {device}
                                             device_state = {device_info}
                                        />  :
                                               null
                         )})
                     }
                       { devices.map( (device, index) => {
                           const device_info = getDeviceState(device, generalState.devices);
                           const deviceType = device_info.type;

                           return(
                                       deviceType === 'sensor' ?
                                           <SensorManager
                                               key = {device}
                                               location = {location}
                                               id = {device}
                                               device_info = {device_info}
                                           />  :
                                           null
                           )})
                       }

                   </Grid>
                 </Grid>

        )
    }
}

export default Location