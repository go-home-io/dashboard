import React from 'react'
import Reflux from 'reflux'
import Grid from '@material-ui/core/Grid';
import NavBar from "./NavBar";
import LeftSideNav from "../components/SideBar/LeftSideNav";
import WebSocketStore from "../reflux/WebSocketStore";
import Location from "../components/location/Location";


class HomePage extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = WebSocketStore;
    }

    render () {
        const generalState = this.props.generalState;
        // console.log(generalState);
        return (
            <Grid container spacing={16} justify='center'>

                <Grid item xs={12}>
                    <NavBar/>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={2}>
                    <LeftSideNav locations={this.props.generalState.locations}/>
                </Grid>

                <Grid item xs={12} sm={12} md={9} lg={10} >

                    {this.props.generalState.locations.map(function (location) {
                        return (
                             <Location  key = {location.name}
                                        location = {location}
                                        generalState = {generalState}/>
                        )
                    })}
                    <Grid item xs={12} sm={4} md={2} lg={2}>

                    </Grid>

                </Grid>

            </Grid>

        )
    }
}

export default HomePage