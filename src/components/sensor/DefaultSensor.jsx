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
        fontSize: 38,
    },
});

class DefaultSensor extends React.Component {
    render () {
        const {classes, state} = this.props;
        const on = state.on;
        const icon = sensorContentIcon(state.sensor_type, on);
        const tip = sensorTip(state.sensor_type, on);
        const color = sensorIconColor(state.sensor_type, on);
        const fontSize = (state.click != null) ? 30 : 40;

        return (
            <div>
                <Grid container justify = 'center' alignItems = 'center'>
                    <TemperatureUpperLine
                        temperature = { state.area }
                        humidity = { state.duration }
                    />
                    
                    <Tooltip title = { tip } placement = "top">
                        <Icon className = { classes.icon }
                            style = { {color:color, fontSize:fontSize} }
                        >
                            {icon}
                        </Icon>
                    </Tooltip>
                    
                    { state.click != null ?
                        <ButtonIcons
                            click = { state.click }
                            double_click = { state.double_click }
                            press = { state.press }
                        /> : null
                    }
                </Grid>

            </div>
        );
    }
}

DefaultSensor.propTypes = {
    classes: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultSensor);

