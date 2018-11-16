import React from "react";
import Reflux from "reflux";
import SensorStoreFactory from "../../reflux/sensor/SensorStore";
import Card from "@material-ui/core/Card/Card";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import truncateCaption from "../utils/truncate";
import TemperatureSensor from "./TemperatureSensor";
import ButtonSensor from "./ButtonSensor";
import DefaultSensor from "./DefaultSensor";
import { SENSOR_HEADER_BKG_COLOR } from "../../settings/colors";
import ComponentHeader from "../common/ComponentHeader";
import sensorActions from "../../reflux/sensor/sensorActions";

const styles = () => ({
    root: {
        // width:172 ,
        // height:165,
        // margin: 5,
    },
});

class SensorManager extends Reflux.Component {
    constructor(props) {
        super(props);
        const { id, device_info, location } = props;
        this.store = SensorStoreFactory(id, device_info, location);
    }
    render () {
        const { classes, id } = this.props;
        const {  name: full_name, visible, device_state, status} = this.state;
        const name = truncateCaption(full_name, 45);
        const display = visible ? "block" : "none";
        const { sensor_type:type, battery_level, temperature, humidity, on } = device_state;

        return (
            <Card className = { classes.root } style = { {display:display} }>
                <ComponentHeader
                    dev_id = { id }
                    name = { name }
                    status = { status }
                    actions = { sensorActions }
                    ordinaryBkgColor = { SENSOR_HEADER_BKG_COLOR }
                    variant = 'sensor'
                    sensor_type = { type }
                />
                {
                    type === "temperature" ?
                        <TemperatureSensor
                            temperature = { temperature }
                            humidity = { humidity }
                            battery_level = { battery_level }
                        />
                        :
                        type === "button" ?
                            <ButtonSensor
                                state = { device_state }
                                battery_level = { battery_level }
                            />
                            :
                            <DefaultSensor
                                state = { device_state }
                                battery_level = { battery_level }
                            />
                }

            </Card>
        );
    }
}

SensorManager.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
};

export default withStyles(styles)(SensorManager);

