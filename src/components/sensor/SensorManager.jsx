import React from "react";
import Reflux from "reflux";
import SensorStoreFactory from "../../reflux/sensor/SensorStore";
import PropTypes from "prop-types";
import truncateCaption from "../utils/truncate";
import TemperatureSensor from "./TemperatureSensor";
import ButtonSensor from "./ButtonSensor";
import DefaultSensor from "./DefaultSensor";
import { SENSOR_HEADER_BKG_COLOR } from "../../settings/colors";
import ComponentHeader from "../common/ComponentHeader";
import sensorActions from "../../reflux/sensor/sensorActions";
import DeviceFrame from "../common/DeviceFrame";

class SensorManager extends Reflux.Component {
    constructor(props) {
        super(props);
        const { id, device_info, location } = props;
        this.store = SensorStoreFactory(id, device_info, location);
    }
    render () {
        const { visible, id } = this.props;
        const {  name: full_name, device_state, status} = this.state;
        const name = truncateCaption(full_name, 45);
        const { sensor_type:type, battery_level, temperature, humidity } = device_state;

        return (
            <DeviceFrame visible = { visible } >
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
            </DeviceFrame>
        );
    }
}

SensorManager.propTypes = {
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
};

export default (SensorManager);

