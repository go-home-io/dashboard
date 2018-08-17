import LightManager from "../light/LightManager";
import React, {Component} from "react";
// import location from "./locations";
import Grid from "@material-ui/core/Grid/Grid";
import GroupManager from "../group/GroupManager";
import getDeviceState from '../getDeviceState';



class Location extends Component {

    render () {
        const location = this.props.location.name;
        const devices = this.props.location.devices;
        const generalState = this.props.generalState;
        // function deviceType(dev_id)  {
        //     return getDeviceState(dev_id, generalState.devices).type
        // }

        return (
                 <Grid container alignContent='center'>
                     {   devices.map(function (device) {
                         const deviceType = getDeviceState(device, generalState.devices).type;
                         return(
                                 deviceType === 'group' ?
                                     <GroupManager
                                             location = {location}
                                             device = {device}
                                             generalState = {generalState}
                                             key = {'gm'+device}

                                        /> :
                                     deviceType === 'light' ?
                                        <LightManager
                                             location = {location}
                                             id = {device}
                                             key = {'lm'+device}
                                             device_state = {getDeviceState(device, generalState.devices)}
                                        /> : null

                         )
                         })
                     }
                 </Grid>

        )
    }

}

export default Location