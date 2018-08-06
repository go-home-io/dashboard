import React, {Component} from 'react'
import Reflux from 'reflux'
import location from '../components/locations';

import Grid from '@material-ui/core/Grid';
import LightManager from "../components/light/LightManager";
import NavBar from "../components/NavBar";
import LeftSide from "../components/SideBar/LeftSideNav";


class HomePage extends Reflux.Component {

    renderLightControl = (item, index) => {

        let start = '';
        if (index === 0) {
            start = item.room;
        }

        return (
                <LightManager
                    location = {item.room}
                    key = {item.room+index}
                    start = {start}
                />
        )
    };

    render () {

        return (
            <Grid container spacing={16}>

                <Grid item xs={12}>
                    <NavBar/>
                </Grid>

                <Grid item sm={4}  lg={3}>
                    <LeftSide/>
                </Grid>

                <Grid item sm={4}  lg={3}>
                    {location.map(this.renderLightControl)}
                </Grid>

            </Grid>

        )
    }
}

export default HomePage