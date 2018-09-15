import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";
import TemperatureUpperLine from "./TemperatureUpperLine";
import ButtonIcons from "./ButtonIcons";
import {sensorContentIcon, sensorIconColor, sensorTip} from "./sensorIcons";

const styles = theme => ({
    icon: {
        fontSize: 38,
        // marginTop: 0,
    },
});

class DefaultSensor extends React.Component {
    render () {
        const {classes} = this.props;
        const on = this.props.state.on;
        const icon = sensorContentIcon(this.props.state.sensor_type, on);
        const tip = sensorTip(this.props.state.sensor_type, on);
        const color = sensorIconColor(this.props.state.sensor_type, on);
        const fontSize = (this.props.state.click != null) ? 30 : 40;

        return (
            <div>
                <Grid container justify='center' alignItems='center'>
                    <TemperatureUpperLine
                        temperature={this.props.state.temperature}
                        humidity={this.props.state.humidity}
                    />
                    
                    <Tooltip title={tip} placement="top">
                        <Icon className={classes.icon}
                              style={{color:color, fontSize:fontSize}}
                        >
                            {icon}
                        </Icon>
                    </Tooltip>
                    
                    { this.props.state.click != null ?
                        <ButtonIcons
                            click={this.props.state.click}
                            double_click={this.props.state.double_click}
                            press={this.props.state.press}
                        /> : null
                    }
                </Grid>

            </div>
        )
    }
}

DefaultSensor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultSensor)

