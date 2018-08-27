import React from 'react'
import Reflux from 'reflux'
import Grid from '@material-ui/core/Grid';
import GoHomeBar from "../navigation/GoHomeBar";
import NavBar from "../navigation/NavBar";
import WebSocketStore from "../../reflux/WebSocketStore";
import Location from "../location/Location";
import Notification from "../notification/Notification";
import Hidden from "@material-ui/core/Hidden/Hidden";
// import locationActions from "../../reflux/locationActions";
// import Fade from "@material-ui/core/Fade/Fade";

class HomePage extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = WebSocketStore;
    }

    render () {
        const generalState = this.props.generalState;
        const locations = generalState.locations;
        // console.log(locations);

        return (
            <Grid container spacing={8} justify='flex-start'>
                <Grid item xs={12}>
                    <GoHomeBar locations={locations}/>
                </Grid>

                <Grid item  md={2}>
                    <Hidden mdDown>
                         <NavBar locations={locations}/>
                    </Hidden>
                </Grid>

                <Grid item md={10} sm={12} >

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