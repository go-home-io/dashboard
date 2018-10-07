import React from "react";
import Reflux from "reflux";
import Grid from "@material-ui/core/Grid";
import GoHomeAppBar from "../navigation/AppBar";
import NavBar from "../navigation/NavBar";
import WebSocketStore from "../../reflux/socket/WebSocketStore";
import Location from "../location/Location";
import Notification from "../notification/Notification";
import Hidden from "@material-ui/core/Hidden/Hidden";
import storage from "../../services/storage";
import appActions from "../../reflux/application/appActions";
import locationActions from "../../reflux/location/locationActions";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
    root: {
        marginTop:69,
        fontFamily: "\"Roboto\", sans-serif",
    }
});

class HomePage extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = WebSocketStore;
    }

    componentDidMount () {
        // Restore active location from local storage and make it visible
        let active_location = storage.get("location");
        active_location = active_location ? active_location : "Default";
        locationActions.visible(active_location);
        appActions.setLocation(active_location);

        // Set UOM scheme to AppStore
        appActions.setUOM(this.props.generalState.uom);
    }

    render () {
        const { classes, generalState } = this.props;
        const { locations } = generalState;

        return (
            <Grid container
                spacing = { 0 }
                justify = 'flex-start'
                className = { classes.root }
            >
                <Grid item xs = { 12 }>
                    <GoHomeAppBar locations = { locations }/>
                </Grid>
                <Hidden mdDown>
                    <Grid item md = { 2 }>
                        <NavBar locations = { locations }/>
                    </Grid>
                </Hidden>

                <Grid item md = { 12 } lg = { 10 } >
                    {locations.map( (location) => {
                        return (
                            <Location
                                key = { location.name }
                                location = { location }
                                generalState = { generalState }
                            />
                        );
                    })}
                </Grid>

                <Notification/>
                <Notification/>
            </Grid>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);