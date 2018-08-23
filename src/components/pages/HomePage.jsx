import React from 'react'
import Reflux from 'reflux'
import Grid from '@material-ui/core/Grid';
import NavBar from "./NavBar";
import LeftSideNav from "../SideBar/LeftSideNav";
import WebSocketStore from "../../reflux/WebSocketStore";
import Location from "../location/Location";
import Notification from "../notification/Notification";


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
            <Grid container spacing={0} justify='center'>
                <Grid item xs={12}>
                    <NavBar/>
                </Grid>

                <Grid item  sm={12} md={3} lg={2}>
                    <LeftSideNav locations={locations}/>
                </Grid>

                <Grid item  sm={12} md={9} lg={10} >

                    {this.props.generalState.locations.map(function (location) {
                        return (
                             <Location  key = {location.name}
                                        location = {location}
                                        generalState = {generalState}/>
                        )
                    })}

                </Grid>
                <Notification/>
            </Grid>

        )
    }
}

export default HomePage