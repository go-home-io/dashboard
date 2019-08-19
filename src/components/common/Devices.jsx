import React from "react";
import Reflux from "reflux";
import SensorManager from "../sensor/SensorManager";
import VacuumManager from "../vacuum/VacuumManager";
import CameraManager from "../camera/CameraManager";
import SwitchManager from "../switch/SwitchManager";
import LightManager from "../light/LightManager";
import Weather from "../weather/Weather";
import MinimizedGroup from "../group/MinimizedGroup";
import AppStore from "../../reflux/application/AppStore";

const deviceManagers = {
    "light": LightManager,
    "sensor": SensorManager,
    "vacuum": VacuumManager,
    "camera": CameraManager,
    "switch": SwitchManager,
    "weather": Weather,
    "minGroup": MinimizedGroup,
};

class Devices extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
    }

    render () {
        const {deviceType, location, ...other } = this.props;
        const Manager = deviceManagers[deviceType];
        const availableDevices = Object.keys(deviceManagers);
        const visible = location === this.state.active_location;
        return (
            availableDevices.includes(deviceType) && <Manager visible = { visible } { ...other }/>
        );
    }
}

export default (Devices);
