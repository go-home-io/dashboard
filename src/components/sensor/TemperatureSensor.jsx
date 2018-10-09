import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";
import TemperatureSymbol from "../common/TemperatureSymbol";
import withStyles from "@material-ui/core/styles/withStyles";
import ComponentUpperInfo from "../common/ComponentUpperInfo";
import Battery from "../common/Battery";

const styles = () => ({
    root: {
        // margin: 0,
        // height: "55%",
        // position: "relative",
        // top: 0,
        // left: 0,
    },
    temperature: {
        // height: "40%",
    //    marginBottom: 0,
    },
    humidity: {
        // height: "20%",
    }
});

class TemperatureSensor extends React.Component {
    render () {
        const {classes, temperature, humidity, battery_level} = this.props;
        const temperatureFormatted = temperature.toFixed(1);
        const humidityFormatted = humidity.toFixed(1);

        return (
            <div >
                <ComponentUpperInfo
                    rightField = {
                        <Battery
                            battery_level = { battery_level }
                        />
                    }
                />
                <div className = { classes.temperature }>
                    <Typography variant = 'display1' align = 'center'>
                        { temperatureFormatted }
                        <TemperatureSymbol/>
                    </Typography>
                </div>
                <div className = { classes.humidity }>
                    <Typography variant = 'body1' align = 'center'>
                        Humidity
                        {" "}
                        {humidityFormatted}
                        %
                    </Typography>
                </div>
            </div>
        );
    }
}

TemperatureSensor.propTypes = {
    classes: PropTypes.object.isRequired,
    temperature: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    battery_level: PropTypes.number
};

export default  withStyles(styles)(TemperatureSensor);

