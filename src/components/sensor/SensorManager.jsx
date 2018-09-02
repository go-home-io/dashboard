import React from 'react';
import Reflux from 'reflux';
import SensorStoreFactory from '../../reflux/sensor/SensorStore';
import Card from '@material-ui/core/Card/Card';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import SensorHeader from "./SensorHeader";
import sensorIcons from "./sensorIcons";
import truncateCaption from "../utils/truncate";
import sensorActions from "../../reflux/sensor/sensorActions";
import BatteryIcon from "./BatteryIcon";
import Temperature from "./Temperature";
import Lock from "./Lock";
import {SENSOR_BKG_COLOR} from '../../settings/colors';
import ButtonIcons from "./ButtonIcons";
import MotionIcon from "./MotionIcon";

const styles = theme => ({
    root: {
        width: 250,
        height: 130,
        margin: 5,
    },
    icon: {
        top: -25,
        left: 196,
        color: 'rgba(0, 0, 0, 0.54)',
        padding: '0 7px',
        position: 'relative',
        fontSize: 13,
    },
    label: {
        fontSize: 11,
        position: 'relative',
        left: 177,
        top:-9,
    },
    weather:{

    }

});

const ordinaryBkgColor = SENSOR_BKG_COLOR;

class SensorManager extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = SensorStoreFactory(this.props.id,  this.props.device_info, this.props.location)
    }

    render () {
        const {classes} = this.props;
        const icon = sensorIcons(this.state.type);
        const name = truncateCaption(this.state.name, 24);
        const display = this.state.visible ? 'block' : 'none';

        return (
            <Card className={classes.root} style={{display:display}}>
                    <SensorHeader
                            dev_id={this.props.id}
                            name = {name}
                            status = {this.state.status}
                            icon = {icon}
                            ordinaryBkgColor={ordinaryBkgColor}
                    />

                    <BatteryIcon
                        battery_level={this.state.device_state.battery_level}
                    />
                    { this.state.type === 'temperature' ?
                        <Temperature
                            temperature={this.state.device_state.temperature}
                            humidity={this.state.device_state.humidity}
                        /> :
                    this.state.type === 'lock' ?
                        <Lock
                            on={this.state.device_state.on}

                        /> :
                    this.state.type === 'button' ?
                        <ButtonIcons
                           click={this.state.device_state.click}
                           double_click={this.state.device_state.double_click}
                           press={this.state.device_state.press}
                        />
                        :
                    this.state.type === 'motion' ?
                        <MotionIcon
                            on={this.state.device_state.on}
                        /> :  null
                    }

            </Card>
        )
    }
}

SensorManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SensorManager)

