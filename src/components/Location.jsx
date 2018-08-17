import LightManager from "../components/light/LightManager";
import React from "react";
import location from "../components/locations";
import Grid from "@material-ui/core/Grid/Grid";
import GroupManager from "./group/GroupManager";
import getDeviceState from './getDeviceState';



class Location extends React.Component {

    render () {
        const location = this.props.location.name;
        const devices = this.props.location.devices;
        const generalState = this.props.generalState;
        function deviceType(dev_id)  {
            return getDeviceState(dev_id, generalState.devices).type
        }

        return (
                 <Grid container alignContent='center'>
                     {   devices.map(function (device) {
                         return(
                             deviceType(device) === 'hub' ? null :
                                 deviceType(device) === 'group' ?
                                     <GroupManager
                                             location = {location}
                                             device = {device}
                                             generalState = {generalState}
                                             key = {'gm'+device+Math.floor(Math.random()*1000)}

                                        /> :
                                        <LightManager
                                             location = {location}
                                             id = {device}
                                             key = {'lm'+device+Math.floor(Math.random()*1000)}
                                             device_state = {getDeviceState(device, generalState.devices)}
                                        />

                         )
                         })
                     }
                 </Grid>

        )
    }

}

export default Location