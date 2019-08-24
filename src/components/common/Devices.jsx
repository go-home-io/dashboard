import React from "react";
import Reflux from "reflux";
import SensorManager from "../devices/sensor/SensorManager";
import VacuumManager from "../devices/vacuum/VacuumManager";
import CameraManager from "../devices/camera/CameraManager";
import SwitchManager from "../devices/switch/SwitchManager";
import LightManager from "../devices/light/LightManager";
import Weather from "../devices/weather/Weather";
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

// const isDeviceInActiveLocation = (activeLocationName, locations, dev_id) => {
//     console.log("active location =", activeLocation, "dev_id", dev_id);
//     console.log("Locations:", locations);
//     const activeLocation = locations.find( location => {
//         return location.name === activeLocationName;
//     });
//     return activeLocation.devices.includes(dev_id);
// };

class Devices extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
    }

    render () {
        const {deviceType, id, visible, ...other } = this.props;
        // const { active_location } = this.state;
        const Manager = deviceManagers[deviceType];
        const availableDevices = Object.keys(deviceManagers);
        // const visible = isDeviceInActiveLocation(active_location, locations, id);

        return (
            availableDevices.includes(deviceType) && <Manager visible = { visible } id = { id } { ...other }/>
        );
    }
}

export default (Devices);
