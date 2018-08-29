import React from 'react'
import Reflux from 'reflux'
import Grid from '@material-ui/core/Grid';
import GoHomeBar from "../navigation/GoHomeBar";
import NavBar from "../navigation/NavBar";
import WebSocketStore from "../../reflux/socket/WebSocketStore";
import Location from "../location/Location";
import Notification from "../notification/Notification";
import Hidden from "@material-ui/core/Hidden/Hidden";
import storage from "../../services/storage";
import appActions from "../../reflux/application/appActions";
import locationActions from "../../reflux/location/locationActions";

class HomePage extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = WebSocketStore;
    }

    // Restore active location from local storage and make it visible
    componentDidMount () {
        let active_location = storage.get('location');
        active_location = active_location ? active_location : 'Default';
        locationActions.visible(active_location);
        appActions.setLocation(active_location);
    }

    render () {
        const generalState = this.props.generalState;
        const locations = generalState.locations;

        return (
            <Grid container spacing={0} justify='flex-start' style={{marginTop:69}}>
                <Grid item xs={12}>
                    <GoHomeBar locations={locations}/>
                </Grid>
                <Hidden mdDown>
                    <Grid item  md={2}>
                             <NavBar locations={locations}/>
                    </Grid>
                </Hidden>

                <Grid item md={12} lg={10} >
                    {locations.map( (location) => {
                        return (
                             <Location  key = {location.name}
                                        location = {location}
                                        generalState = {generalState}/>
                        )
                    })}
                </Grid>

                <Notification/>
                <Notification/>
            </Grid>
        )
    }
}

export default HomePage