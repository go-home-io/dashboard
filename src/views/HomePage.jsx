import React, {Component} from 'react'
import Reflux from 'reflux'
import Grid from '@material-ui/core/Grid';
import NavBar from "./NavBar";
import LeftSide from "../components/SideBar/LeftSideNav";
import WebSocketStore from "../reflux/WebSocketStore";
import HomePageContent from "./HomePageContent";
import Location from "../components/Location";


class HomePage extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = WebSocketStore;
    }

    // componentWillMount () {
    //     this.setState({generalState: this.props.generalState});
    //     alert('Mount');
    //     console.log(this.state.generalState);
    // }

    render () {
        const generalState = this.props.generalState;
        // console.log(generalState);
        return (
            <Grid container spacing={16}>

                <Grid item xs={12}>
                    <NavBar/>
                </Grid>

                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <LeftSide/>
                </Grid>

                <Grid item xs={12} sm={8} md={9} lg={10}>

                    {this.props.generalState.locations.map(function (location) {
                        return (
                             <Location  key = {location.name}
                                        location = {location}
                                        generalState = {generalState}/>
                        )
                    })}

                </Grid>

            </Grid>

        )
    }
}

export default HomePage