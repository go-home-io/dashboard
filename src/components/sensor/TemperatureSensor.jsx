import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TemperatureSymbol from "../common/TemperatureSymbol";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
    root: {
        margin: 0,
    },
    temperature: {
        position: 'relative',
        top: 10,
        left: 0
    },
    humidity: {
        position: 'relative',
        top: 10,
        left: 0
    }
});

class TemperatureSensor extends React.Component {
    render () {
        const {classes, temperature, humidity} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.temperature}>
                    <Typography variant = 'display1' align = 'center'>
                        {temperature}
                        <TemperatureSymbol/>
                    </Typography>
                </div>
                <div className={classes.humidity}>
                    <Typography variant = 'body1' align = 'center'>
                        Humidity
                        {" "}
                        {humidity}
                        %
                    </Typography>
                </div>
            </div>
        );
    }
}

TemperatureSensor.propTypes = {
    temperature: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired
};

export default  withStyles(styles)(TemperatureSensor);

