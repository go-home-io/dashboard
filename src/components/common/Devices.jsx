import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SensorManager from "../sensor/SensorManager";
import VacuumManager from "../vacuum/VacuumManager";
import CameraManager from "../camera/CameraManager";
import SwitchManager from "../switch/SwitchManager";
import LightManager from "../light/LightManager";
import Weather from "../weather/Weather";
import MinimizedGroup from "../group/MinimizedGroup";

const styles = () => ({
    root: {
        width: 172,
        height: 165,
        margin: 5,
    },
});

const deviceManagers = {
    "light": LightManager,
    "sensor": SensorManager,
    "vacuum": VacuumManager,
    "camera": CameraManager,
    "switch": SwitchManager,
    "weather": Weather,
    "minGroup": MinimizedGroup,
};

class Devices extends React.Component {
    render () {
        const {deviceType} = this.props;
        const Manager = deviceManagers[deviceType];
        const availableDevices = Object.keys(deviceManagers);
        return (
            availableDevices.includes(deviceType) ?
                <div>
                    <Manager { ...this.props }/>
                </div>
                :
                null
        );
    }
}

export default withStyles(styles)(Devices);
