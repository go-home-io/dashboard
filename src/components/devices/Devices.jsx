import React, {useContext, useEffect, useState} from "react";
import SensorManager from "./sensor/SensorManager";
import VacuumManager from "./vacuum/VacuumManager";
import CameraManager from "./camera/CameraManager";
import SwitchManager from "./switch/SwitchManager";
import LightControl from "./light/LightControl";
import Weather from "./weather/Weather";
import MinimizedGroup from "./group/MinimizedGroup";
import {EventEmitter} from "../../context/EventEmitter";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {oneWayCommands} from "../../settings/oneWayCommands";
import LockControl from "./lock/LockControl";
import ComponentHeader from "./header/ComponentHeader";
import truncateCaption from "../../utils/truncate";
import {maxSymbolsInNamePerLine} from "../../settings/maxSymbolsInNamePerLine";
import Zoom from "@material-ui/core/Zoom";
import WaitingProgress from "../common/elements/WaitingProgress";
import InputManager from "../common/input/InputManager";

const deviceManagers = {
    "light": LightControl,
    "sensor": SensorManager,
    "vacuum": VacuumManager,
    "switch": SwitchManager,
    "weather": Weather,
    "group": MinimizedGroup,
    "lock": LockControl,
    "camera": CameraManager
};

const useStyles = makeStyles({
    root: {
        width:172,
        height:165,
        margin: 5,
    },
    progress: {
        padding:3,
        marginTop: 38,
        marginLeft: "10%",
        width: "80%"
    }
});

const Devices = props => {
    // Actions
    const doCommand = (id, command, value) => {
        const mess = {
            id: id,
            cmd: command,
            value: value,
            oneWay: oneWayCommands.includes(command)
        };
        raiseEvent("command", mess); // Send command to socket
        setIsLoading(true);
    };

    // Websocket listener
    const onMessage = (mess) => {
        const { state, id: recipientID } = mess;
        if (recipientID !== id) return;
        if ( state !== "oneWayResponse" )  setDevState(state);
        raiseEvent("status", {id: id, status: "success" }); // Update Component Header status
        setIsLoading(false);
    };

    const onLoading = data => {
        const { id: recipientID , loading } = data;
        if ( recipientID !== id || deviceType === "sensor" ) return;
        setIsLoading(loading);
    };

    const { deviceType, id, visible, device_info, ...other } = props;
    const classes = useStyles();
    const { name, state: deviceState, read_only: readOnly } = device_info;
    const [devState, setDevState] = useState(deviceState);
    const { on, input, sensor_type, vac_status } = devState;
    let title, params;
    if ( input ) {
        title = input.title;
        params = input.params;
    }


    const { subscribe, raiseEvent, unsubscribe } = useContext(EventEmitter);
    const [isLoading, setIsLoading] = useState(false);
    const caption = truncateCaption(name, maxSymbolsInNamePerLine );

    const Manager = deviceManagers[deviceType];
    const display = visible ? "block" : "none";
    const availableDevices = Object.keys(deviceManagers);

    useEffect( () => {
        subscribe("message", onMessage );
        subscribe("loading", onLoading);
        return () => {
            unsubscribe("message", onMessage );
            unsubscribe("loading", onLoading);
        };
    },
    // eslint-disable-next-line
        []);

    return (
        availableDevices.includes(deviceType) ?
            deviceType === "camera" ?
                <CameraManager
                    id = { id }
                    device_state = { devState }
                    device_info = { device_info }
                    visible = { visible }
                />
                :
                <Card style = { { display: display} } className = { classes.root }>
                    {deviceType !== "weather" &&
                        <ComponentHeader
                            dev_id = { id }
                            name = { caption }
                            variant = { deviceType === "group" ? "minGroup" : deviceType }
                            on = { on }
                            doCommand = { doCommand }
                            read_only = { readOnly }
                            sensor_type = { sensor_type }
                            vac_status = { vac_status }
                        />
                    }
                    {isLoading ?
                        <Zoom in = { isLoading }>
                            <div className = { classes.progress } >
                                <WaitingProgress dev_id = { id }/>
                            </div>
                        </Zoom>
                        :
                        <Zoom in = { !isLoading }>
                            {input ?
                                params &&
                                <InputManager
                                    dev_id = { id }
                                    params = { params }
                                    title = { title }
                                    doCommand = { doCommand }
                                />
                                :
                                <Manager
                                    id = { id }
                                    device_state = { devState }
                                    device_info = { device_info }
                                    doCommand = { doCommand }
                                    { ...other }
                                />
                            }
                        </Zoom>
                    }
                </Card>
            :
            null
    );
};

export default Devices;
