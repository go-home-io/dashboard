import React from "react";
import {MOTION_ICON_COLOR_ON, SENSOR_ICON_COLOR_OFF, SENSOR_ICON_COLOR_ON} from "../../settings/colors";

export const getSensorHeaderIcon = (type) => {
    switch(type) {
    case "motion":
        return "transfer_within_a_station";
    case "button":
        return "touch_app";
    case "temperature":
        return <i className = "fa fa-thermometer-empty" aria-hidden = "true" />;
    case "lock":
        return <i className = "fa fa-lock" aria-hidden = "true" />;
    default:
        return "device_unknown";
    }
};

export const sensorContentIcon = (type, on) => {
    switch (type) {
    case "motion":
        return on ? "directions_walk" : "hotel";
    case "lock":
        return on ? "lock_open" : "lock";
    default:
        return on ? "toggle_on" : "toggle_off";
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
