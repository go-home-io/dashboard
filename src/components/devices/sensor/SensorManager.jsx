import React from "react";
import PropTypes from "prop-types";
import TemperatureSensor from "./TemperatureSensor";
import ButtonSensor from "./ButtonSensor";
import DefaultSensor from "./DefaultSensor";

const SensorManager = props => {
    const { device_state } = props;
    const { sensor_type:type, battery_level, temperature, humidity } = device_state;

    return (
        <>
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

