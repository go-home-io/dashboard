import React, {useContext} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import TemperatureSymbol from "../../common/elements/TemperatureSymbol";
import Grid from "@material-ui/core/Grid/Grid";
import truncateCaption from "../../../utils/truncate";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { PartlyCloudyDay, AtmosphericPressure,  WindSock } from "./Icon8JPG";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { unitsOfMeasure } from "../../../settings/uom";
import DeviceName from "../header/DeviceName";
import classNames from "classnames";
import {formatNumericProp} from "../../../settings/formatNumericProp";
import {AppContext} from "../../../context/AppContextProvider";

const styles = () => ({
    root: {
        height: "100%",
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
        height: 30,
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
        marginTop: 5,
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
    },
    textLeft: {
        textAlign: "left"
    },
    textCenter: {
        textAlign: "center"
    }

});

const Weather = props =>{

    const { classes, device_info, device_state } = props;
    const { name } = device_info;
    const { uom } = useContext(AppContext);
    const { sunrise, sunset, description } = device_state;
    const shortName = truncateCaption(name,14);
    const { pressureUnits, visibilityUnits, windSpeedUnits } = (uom !== "") ? unitsOfMeasure[uom] : "";

    let { humidity, pressure, wind_speed, temperature, visibility, wind_direction  } = device_state;
    pressure = formatNumericProp(uom, "pressure", pressure);
    temperature = formatNumericProp(uom, "temperature", temperature);
    humidity = formatNumericProp(uom, "humidity", humidity);
    wind_speed = formatNumericProp(uom, "wind_speed", wind_speed);
    visibility = formatNumericProp(uom, "visibility", visibility);
    wind_direction = formatNumericProp(uom, "wind_direction", wind_direction);

    return (
        <div className = { classes.root } >

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
                        <div className = { classes.name }>
                            <DeviceName name = { shortName } />
                        </div>
                    </Tooltip>
                </Grid>
            </Grid>

            <Typography variant = "h5" className = { classes.temperature }>
                {temperature}
                {" "}
                <TemperatureSymbol/>
            </Typography>
            <Typography variant = "caption" className = { classes.humidity }>
                Humidity
                {" "}
                {humidity}
                %
            </Typography>

            <Typography variant = "body2" className = { classes.humidity }>
                {description}
            </Typography>

            <Grid container className = { classes.container }>
                <Grid item xs = { 6 } className = { classes.grid_item }>
                    <Tooltip
                        title = { "pressure, " + pressureUnits }
                        placement = "left-start"
                    >
                        {AtmosphericPressure}
                    </Tooltip>
                    <Typography
                        variant = "caption"
                        className = { classNames(classes.typography, classes.textLeft) }
                    >
                        { pressure }
                    </Typography>

                </Grid>

                <Grid item xs = { 6 } className = { classes.grid_item }>
                    <Tooltip title = "wind direction" placement = "right-start">
                        <div className = { classes.icon_compass }>
                            <FontAwesomeIcon icon = "compass"/>
                        </div>
                    </Tooltip>
                    <Typography
                        variant = "caption"
                        className = { classNames(classes.typography, classes.textLeft) }
                    >
                        { wind_direction }
                        {" "}
                        &deg;
                    </Typography>
                </Grid>


                <Grid item xs = { 6 } className = { classes.grid_item }>
                    <Tooltip title = "wind speed" placement = "left-start">
                        { WindSock }
                    </Tooltip>
                    <Typography
                        variant = "caption"
                        className = { classNames(classes.typography, classes.textCenter) }
                    >
                        {wind_speed}
                        {" "}
                        {windSpeedUnits}
                    </Typography>

                </Grid>
                <Grid item xs = { 6 } className = { classes.grid_item }>
                    <Tooltip title = "visibility" placement = "right-start">
                        <RemoveRedEye/>
                    </Tooltip>
                    <Typography
                        variant = "caption"
                        className = { classNames(classes.typography, classes.textCenter) }
                    >
                        {"  "}
                        {visibility}
                        {" "}
                        {visibilityUnits}
                    </Typography>
                </Grid>
            </Grid>

        </div>
    );
};

Weather.propTypes = {
    classes: PropTypes.object.isRequired,
    device_info: PropTypes.object.isRequired ,
    device_state: PropTypes.object.isRequired,
};

export default withStyles(styles)(Weather);
