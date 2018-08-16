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

        return (
                 <Grid container>
                     {   devices.map(function (device) {
                         return(
                             <div>
                                 <GroupManager
                                         location = {location}
                                         device = {device}
                                         generalState = {generalState}
                                         key = {device}
                                    />
                                    <LightManager
                                         location = {location}
                                         id = {device}
                                         key = {device}
                                         device_state = {getDeviceState(device, generalState.devices)}
                                    />
                             </div>
                         )
                         })
                     }
                 </Grid>

        )
    }

}

export default Location