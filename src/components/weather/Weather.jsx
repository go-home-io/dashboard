import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import Icon8 from "./Icon8";
import TemperatureSymbol from "../common/TemperatureSymbol";
import Grid from "@material-ui/core/Grid/Grid";
import truncateCaption from "../utils/truncate";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { PartlyCloudyDay, AtmosphericPressure, WindGauge, WindSock} from "./Icon8JPG";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const styles = () => ({
    root: {
        marginTop: 0,
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
        justifyContent: 'center'
    },
    humidity: {
        color:"white",
        display: "flex",
        justifyContent: 'center',
        marginTop: -2
    },
    container: {
        marginTop: 10,
        marginLeft:5,
    },
    grid_item: {
        display: 'flex',
        justifyContent: 'center',
        // marginLeft: 5,
    },
    typography: {
        color: "#ffffff",
        marginLeft: 3,
        display: 'flex',
        // alignContent: 'center'
    },
    item_icons: {
        width: 24,
        height: 24
    },
    icon_compass: {
        marginLeft: -11,
        fontSize: 21
    }

});

class Weather extends React.Component {

    render () {
        const {classes} = this.props;
        const name = "Test_weather_long";
        const shortName = truncateCaption(name,14);
        return (
            <Card className = { classes.root }>
                <Grid container alignItems='flex-start' className = { classes.icon_cloud }>
                    <Grid item xs={3} >
                        { PartlyCloudyDay }
                    </Grid>
                    <Grid item xs={9} >
                        <Tooltip  title={ name } placement="top">
                        <Typography variant="subheading"  className={classes.name}>
                            {shortName}
                        </Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Typography variant="display1" align='center' className={classes.temperature}>
                    51.6 <TemperatureSymbol/>
                </Typography>
                <Typography variant="caption" align='center' className={classes.humidity}>
                    Humidity 77.3%
                </Typography>

                <Grid container className={classes.container}>


                    <Grid item xs={6} className={classes.grid_item}>
                        {AtmosphericPressure}
                        <Typography variant="caption" align="flex-start" className={classes.typography}>
                            1005 mbar
                        </Typography>
                    </Grid>

                    <Grid item xs={6} className={classes.grid_item}>
                        <div className={classes.icon_compass}>
                            <FontAwesomeIcon icon = "compass"/>
                        </div>
                        <Typography variant="caption" align="left" className={classes.typography}>
                            230 &deg;
                        </Typography>
                    </Grid>


                    <Grid item xs={6} className={classes.grid_item}>
                        { WindSock }
                        <Typography variant="caption" align="center" className={classes.typography}>
                            14 mph
                        </Typography>

                    </Grid>
                    <Grid item xs={6} className={classes.grid_item}>
                        <RemoveRedEye/>
                        <Typography variant="caption" align="center" className={classes.typography}>
                            {"  "}
                            16.1 m
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

