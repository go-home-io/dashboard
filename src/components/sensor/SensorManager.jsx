import React from 'react';
import Reflux from 'reflux';
import SensorStoreFactory from '../../reflux/sensor/SensorStore';
import Card from '@material-ui/core/Card/Card';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {sensorHeaderIcon} from "./sensorIcons";
import truncateCaption from "../utils/truncate";
import BatteryIcon from "./BatteryIcon";
import TemperatureSensor from "./TemperatureSensor";
import ButtonSensor from "./ButtonSensor";
import DefaultSensor from "./DefaultSensor";
import {SENSOR_HEADER_ICON_COLOR, SENSOR_HEADER_BKG_COLOR} from '../../settings/colors';
import ComponentHeader from "../common/ComponentHeader";
import sensorActions from "../../reflux/sensor/sensorActions";

const styles = theme => ({
    root: {
        width:172,
        height:165,
        margin: 5,
    },
});

const ordinaryBkgColor = SENSOR_HEADER_BKG_COLOR;

class SensorManager extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = SensorStoreFactory(this.props.id,  this.props.device_info, this.props.location);
    }
    render () {
        const {classes} = this.props;
        const icon = sensorHeaderIcon(this.state.type);
        const name = truncateCaption(this.state.name, 45);
        const display = this.state.visible ? 'block' : 'none';

        return (
            <Card className={classes.root} style={{display:display}}>
                    <ComponentHeader
                        dev_id={this.props.id}
                        name = {name}
                        status = {this.state.status}
                        actions = {sensorActions}
                        icon = {icon}
                        ordinaryBkgColor={ordinaryBkgColor}
                        variant = 'sensor'
                        iconColorOn = {SENSOR_HEADER_ICON_COLOR}
                    />
                    <BatteryIcon
                        battery_level={this.state.device_state.battery_level}
                    />
                    { this.state.type === 'temperature' ?
                        <TemperatureSensor
                            temperature={this.state.device_state.temperature}
                            humidity={this.state.device_state.humidity}
                        /> :
                    this.state.type === 'button' ?
                        <ButtonSensor
                            state={this.state.device_state}
                        />
                        :
                        <DefaultSensor
                            state={this.state.device_state}
                        />
                    }

            </Card>
        )
    }
}

SensorManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SensorManager)

