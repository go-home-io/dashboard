import React from "react";
import {MOTION_ICON_COLOR_ON, SENSOR_ICON_COLOR_OFF, SENSOR_ICON_COLOR_ON} from "../../../settings/colors";
import TransferWithinAStation from "@material-ui/icons/TransferWithinAStation";
import TouchApp from "@material-ui/icons/TouchApp";
import Face from "@material-ui/icons/Face";
import TagFaces from "@material-ui/icons/TagFaces";
import DeviceUnknown from "@material-ui/icons/DeviceUnknown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {DirectionsWalk, Hotel, Lock, LockOpen, ToggleOn, ToggleOff } from "@material-ui/icons";

export const getSensorHeaderIcon = (type) => {
    switch(type) {
    case "motion":
        return <TransferWithinAStation/>;
    case "button":
        return <TouchApp/>;
    case "temperature":
        return  <FontAwesomeIcon icon = "thermometer-half"/>;
    case "lock":
        return <FontAwesomeIcon icon = "lock"/>;
    case "presence":
        return <Face/>;
    default:
        return <DeviceUnknown/>;
    }
};

export const sensorContentIcon = (type, on) => {
    switch (type) {
    case "motion":
        return on ? DirectionsWalk : Hotel;
    case "lock":
        return on ? LockOpen : Lock;
    case "presence":
        return on ? TagFaces : Face;
    default:
        return on ? ToggleOn : ToggleOff;
    }
};

export const sensorTip = (type, on) => {
    switch (type) {
    case "motion":
        return on ? "Motion detected" : "No motion";
    case "lock":
        return on ?  "Lock open" : "Lock closed";
    default:
        return on ? "ON" : "OFF";
    }
};

export const sensorIconColor = (type, on) => {
    switch (type) {
    case "motion":
        return  on ? MOTION_ICON_COLOR_ON : SENSOR_ICON_COLOR_OFF;
    default:
        return on ? SENSOR_ICON_COLOR_ON : SENSOR_ICON_COLOR_OFF;
    }
};
