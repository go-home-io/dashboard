import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import TemperatureSymbol from "../common/TemperatureSymbol";
import Grid from "@material-ui/core/Grid/Grid";
import truncateCaption from "../utils/truncate";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { PartlyCloudyDay, AtmosphericPressure,  WindSock } from "./Icon8JPG";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AppStore from "../../reflux/application/AppStore";
import WeatherStoreFactory from "../../reflux/weather/WeatherStore";
import { unitsOfMeasure } from "../../settings/uom";

const styles = () => ({
    root: {
        width:172,
        height:165,
        margin: 5,
        backgroundColor: "#1795df",
        color: "#ffffff",
    },
    icon_cloud: {
        color: "#fff",
        marginTop: 3,
        marginLeft: 3,
        marginBottom: -12,
    },
    name: {
        color: "#fff",
        marginLeft: 10,
        overflow: "hidden",
        height: 20,
        marginTop: 7
    },
    temperature: {
        color: "white",
        display: "flex",
        justifyContent: "center"
    },
    humidity: {
        color:"white",
        display: "flex",
        justifyContent: "center",
        marginTop: -2
    },
    container: {
        marginTop: 10,
        marginLeft:5,
    },
    grid_item: {
        display: "flex",
        justifyContent: "center",
    },
    typography: {
        color: "#ffffff",
        marginLeft: 3,
        display: "flex",
    },
    item_icons: {
        width: 24,
        height: 24
    },
    icon_compass: {
        marginLeft: -10,
        fontSize: 21
    }

});

class Weather extends Reflux.Component {
    constructor(props) {
        super(props);
        const { id, device_info, location } = props;
        this.stores = [ AppStore, WeatherStoreFactory(id, device_info, location)];
    }
    render () {
        const {classes} = this.props;
        const { name, device_state, visible, uom } = this.state;
        const { visibility, wind_direction, wind_speed, sunrise, sunset } = device_state;
        const shortName = truncateCaption(name,14);
        const   { pressureUnits, visibilityUnits, windSpeedUnits } = (uom !== "") ? unitsOfMeasure[uom] : "";
        const display = visible ? "block" : "none";

        let { humidity, pressure, temperature } = device_state;
        pressure = (pressure == null) ? null :
            ( uom === "imperial" ) ? pressure.toFixed(3) : Math.round(pressure);
        temperature = (temperature != null) ?  temperature.toFixed(1) : null ;
        humidity = (humidity != null) ? humidity.toFixed(1) : null;


        return (
            <Card style = { { display:display } } className = { classes.root } >

                <Grid container alignItems = 'flex-start' className = { classes.icon_cloud }>

                    <Grid item xs = { 3 } >
                        <Tooltip
                            placement = "left-start"
                            title = { "sunrise " + sunrise +  "   ||   sunset " + sunset }
                        >
                            { PartlyCloudyDay }
                        </Tooltip>
                    </Grid>

                    <Grid item xs = { 9 } >
                        <Tooltip title = { name } placement = "top">
                            <Typography variant = "subheading" className = { classes.name }>
                                {shortName}
                            </Typography>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Typography variant = "display1" align = 'center' className = { classes.temperature }>
                    {temperature}
                    {" "}
                    <TemperatureSymbol/>
                </Typography>
                <Typography variant = "caption" align = 'center' className = { classes.humidity }>
                    Humidity
                    {" "}
                    {humidity}
                    %
                </Typography>

                <Grid container className = { classes.container }>
                    <Grid item xs = { 6 } className = { classes.grid_item }>
                        <Tooltip
                            title = { "pressure, " + pressureUnits }
                            placement = "left-start"
                        >
                            {AtmosphericPressure}
                        </Tooltip>
                        <Typography variant = "caption" align = "left" className = { classes.typography }>
                            { pressure }


                        </Typography>

                    </Grid>

                    <Grid item xs = { 6 } className = { classes.grid_item }>
                        <Tooltip title = "wind direction" placement = "right-start">
                            <div className = { classes.icon_compass }>
                                <FontAwesomeIcon icon = "compass"/>
                            </div>
                        </Tooltip>
                        <Typography variant = "caption" align = "left" className = { classes.typography }>
                            { wind_direction }
                            {" "}
                            &deg;
                        </Typography>
                    </Grid>


                    <Grid item xs = { 6 } className = { classes.grid_item }>
                        <Tooltip title = "wind speed" placement = "left-start">
                            { WindSock }
                        </Tooltip>
                        <Typography variant = "caption" align = "center" className = { classes.typography }>
                            {wind_speed}
                            {" "}
                            {windSpeedUnits}
                        </Typography>

                    </Grid>
                    <Grid item xs = { 6 } className = { classes.grid_item }>
                        <Tooltip title = "visibility" placement = "right-start">
                            <RemoveRedEye/>
                        </Tooltip>
                        <Typography variant = "caption" align = "center" className = { classes.typography }>
                            {"  "}
                            {visibility}
                            {" "}
                            {visibilityUnits}
                        </Typography>
                    </Grid>
                </Grid>

            </Card>
        );
    }
}

Weather.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Weather);
