import React from "react";
import Reflux from 'reflux';
import Grid from "@material-ui/core/Grid/Grid";
import GroupManager from "../group/GroupManager";
import getDeviceState from '../utils/getDeviceState';
import LightManager from "../light/LightManager";
import LocationStoreFactory from "../../reflux/LocationStore";

class Location extends Reflux.Component {
    constructor(props) {
        super(props);

        this.store = LocationStoreFactory(props.location.name, props.location.devices);
        // props.location.devices);
        // alert(props.location.name+' : '+props.location.devices);
    }

    render () {
        const location = this.props.location.name;
        const devices = this.props.location.devices;
        const generalState = this.props.generalState;
        // console.log('location state');
        // console.log(this.state);

        return (
                 <Grid container>
                     { devices.map( (device, index) => {
                         const deviceType = getDeviceState(device, generalState.devices).type;
                         const display = this.state.visible ? 'block' : 'none';


                         return(
                                 deviceType === 'group' ?
                                    <div style={{display:display}} key = {device}>
                                         <GroupManager
                                                 location = {location}
                                                 device = {device}
                                                 generalState = {generalState}
                                                 key = {device}
                                         />
                                    </div>   :
                                     deviceType === 'light' ?

                                            <LightManager
                                                 location = {location}
                                                 id = {device}
                                                 key = {device}
                                                 device_state = {getDeviceState(device, generalState.devices)}
                                            />

                                              : null
                         )})
                     }
                 </Grid>

        )
    }
}

export default Location