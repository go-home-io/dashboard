import React, {useContext, useEffect, useState} from "react";
import SensorManager from "./sensor/SensorManager";
import VacuumManager from "./vacuum/VacuumManager";
import CameraManager from "./camera/CameraManager";
import SwitchManager from "./switch/SwitchManager";
import LightManager from "./light/LightManager";
import Weather from "./weather/Weather";
import MinimizedGroup from "../group/MinimizedGroup";
import {EventEmitter} from "../../context/EventEmitter";
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {oneWayCommands} from "../../settings/oneWayCommands";
import LockManager from "./lock/LockManager";

const styles = () => ({
    root: {
        width:172,
        height:165,
        margin: 5,
    },
});

const deviceManagers = {
    "light": LightManager,
    "sensor": SensorManager,
    "vacuum": VacuumManager,
    "switch": SwitchManager,
    "weather": Weather,
    "group": MinimizedGroup,
    "lock": LockManager
};

const Devices = props => {
    // Actions
    const doCommand = (id, command, value) => {
        const mess = {
            id:id,
            cmd:command,
            value: value,
            oneWay: oneWayCommands.includes(command)
        };
        raiseEvent("command", mess); // Send command to socket
        raiseEvent("loading", { id:id, loading: true }); // Update loading status in Component Manager
    };

    // Websocket listener
    const onMessage = (mess) => {
        const { state, id: recipientID } = mess;
        if (recipientID !== id) return;
        if ( state !== "oneWayResponse" )  setDevState(mess.state);
        raiseEvent("status", {id: id, status: "success" }); // Update Component Header status
        raiseEvent("loading", { id:id, loading: false }); // Update loading status in Component Manager
    };

    const {classes, deviceType, id, visible, device_info, ...other } = props;
    const [devState, setDevState] = useState(device_info.state);
    const { subscribe, raiseEvent, unsubscribe } = useContext(EventEmitter);

    const Manager = deviceManagers[deviceType];
    const display = visible ? "block" : "none";
    const availableDevices = Object.keys(deviceManagers);

    useEffect( () => {
        subscribe("message", onMessage );
        return () => unsubscribe("message", onMessage );
    },
    // eslint-disable-next-line
    []);

    return (
        deviceType === "camera" ?
            <CameraManager
                id = { id }
                device_state = { devState }
                device_info = { device_info }
                visible = { visible }
            />
            :
            availableDevices.includes(deviceType) &&
            <Card style = { { display: display} } className = { classes.root }>
                <Manager
                    id = { id }
                    device_state = { devState }
                    device_info = { device_info }
                    doCommand = { doCommand }
                    { ...other }
                />
            </Card>
    );
};

export default withStyles(styles)(Devices);
