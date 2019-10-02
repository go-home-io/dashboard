import React from "react";
import PropTypes from "prop-types";
import truncateCaption from "../../../utils/truncate";
import TemperatureSensor from "./TemperatureSensor";
import ButtonSensor from "./ButtonSensor";
import DefaultSensor from "./DefaultSensor";
import ComponentHeader from "../header/ComponentHeader";
import {maxSymbolsInNamePerLine} from "../../../settings/maxSymbolsInNamePerLine";

const SensorManager = props => {
    const { id, device_state, status, device_info } = props;
    const {  name: full_name } = device_info;
    const name = truncateCaption(full_name, maxSymbolsInNamePerLine );
    const { sensor_type:type, battery_level, temperature, humidity } = device_state;

    return (
        <>
            <ComponentHeader
                dev_id = { id }
                name = { name }
                status = { status }
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
        </>
    );
};

SensorManager.propTypes = {
    id: PropTypes.string.isRequired,
    device_info: PropTypes.object.isRequired,
};

export default (SensorManager);

