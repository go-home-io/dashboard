import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";
import ButtonIcons from "./ButtonIcons";
import {sensorContentIcon, sensorIconColor, sensorTip} from "./sensorMisc";
import ComponentUpperInfo from "../../common/ComponentUpperInfo";
import Temperature from "./Temperature";
import Humidity from "./Humidity";
import Battery from "../../common/Battery";

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
        const {classes, state, battery_level} = this.props;
        const { on, sensor_type, temperature, humidity } = state;
        const IconSelected = sensorContentIcon(sensor_type, on);
        const tip = sensorTip(sensor_type, on);
        const color = sensorIconColor(sensor_type, on);

        return (
            <div>
                <ComponentUpperInfo
                    leftField = {
                        <Temperature temperature = { temperature } />
                    }
                    centerField = {
                        <Humidity humidity =  { humidity } />
                    }
                    rightField = {
                        <Battery battery_level = { battery_level } />
                    }
                />
                <Grid container justify = 'center' alignItems = 'center'>
                    <ButtonIcons
                        click = { state.click }
                        double_click = { state.double_click }
                        press = { state.press }
                    />
                    { (on != null ) ?
                        <Tooltip title = { tip } placement = "top">
                            <IconSelected className = { classes.icon }
                                style = { {color: color} }
                            />
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
    battery_level: PropTypes.number
};

export default withStyles(styles)(ButtonSensor);

