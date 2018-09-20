import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";
import TemperatureUpperLine from "./TemperatureUpperLine";
import ButtonIcons from "./ButtonIcons";
import {sensorContentIcon, sensorIconColor, sensorTip} from "./sensorIcons";

const styles = () => ({
    icon: {
        fontSize: 25,
        position: "relative",
        top: 5,
        left: -67,
    }
});

class ButtonSensor extends React.Component {
    render () {
        const {classes, state} = this.props;
        const on = state.on;
        const icon = sensorContentIcon(state.sensor_type, on);
        const tip = sensorTip(state.sensor_type, on);
        const color = sensorIconColor(state.sensor_type, on);

        return (
            <div>
                <Grid container justify = 'center' alignItems = 'center'>
                    <TemperatureUpperLine
                        temperature = { state.temperature }
                        humidity = { state.humidity }
                    />
                    <ButtonIcons
                        click = { state.click }
                        double_click = { state.double_click }
                        press = { state.press }
                    />
                    { (on != null ) ?
                        <Tooltip title = { tip } placement = "top">
                            <Icon className = { classes.icon }
                                style = { {color: color} }
                            >
                                {icon}
                            </Icon>
                        </Tooltip> : null
                    }
                </Grid>
            </div>
        );
    }
}

ButtonSensor.propTypes = {
    classes: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSensor);

