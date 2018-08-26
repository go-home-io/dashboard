import React from 'react'
import Reflux from 'reflux'
import Grid from '@material-ui/core/Grid';
import NavBar from "../navbar/GoHomeBar";
import LeftSideNav from "../navbar/NavBar";
import WebSocketStore from "../../reflux/WebSocketStore";
import Location from "../location/Location";
import Notification from "../notification/Notification";
import Hidden from "@material-ui/core/Hidden/Hidden";
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
                    <NavBar locations={locations}/>
                </Grid>

                <Grid item  md={2} sm={0}>
                    <Hidden mdDown>
                         <LeftSideNav locations={locations}/>
                    </Hidden>
                </Grid>

                <Grid item md={10} sm={12} >

                    {this.props.generalState.locations.map( (location) => {
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