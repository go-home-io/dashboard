import React, {useContext, useEffect, useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper/Paper";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { HEADER_HIGHLIGHT_DURATION } from "../../../settings/deviceDelays";
import { SUCCESS_BKG_COLOR, ERROR_BKG_COLOR } from "../../../settings/colors";
import IconHeader from "../../common/elements/IconHeader";
import SensorHeaderIcon from "../sensor/SensorHeaderIcon";
import VacuumStatusIcon from "../vacuum/VacuumStatusIcon";
import SyncDisabled from "@material-ui/icons/SyncDisabled";
import DeviceName from "../../common/elements/DeviceName";
import {EventEmitter} from "../../../context/EventEmitter";

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        height: 38,
    },
    root: {
        marginTop:-7,
        width: "100%",
        height: "100%",
    },
    icon: {
        position: "relative",
        left:-19,
        top:-10,
        padding:3,
        fontSize: 22,
    },
    name: {
        position: "relative",
        left: 12,
        top: -36,
        color: "#fff",
    },
    ro_icon: {
        position: "relative",
        left: -47,
        top: 30,
        fontSize: 21,
    }
});

const doVacuumCommand = (dev_id, doCommand, vac_status) => {
    let cmd = "";
    switch (vac_status) {
    case "cleaning":
        cmd = "pause";
        break;
    case "paused":
        cmd = "on";
        break;
    default:
    }
    if ( cmd ) doCommand(dev_id, cmd, "");
};

const ComponentHeader = (props) => {
    const getHeaderBackgroundColor = (status) => {
        const { ordinaryBkgColor } = props;
        let bgColor = null;

        if ((status === "success")) {
            bgColor = SUCCESS_BKG_COLOR;
        } else if (status === "error") {
            bgColor = ERROR_BKG_COLOR;
        }
        if (bgColor) {
            clearInterval(timer);
            timer = setInterval(setOrdinaryStatus, HEADER_HIGHLIGHT_DURATION);
            return bgColor;
        } else {
            return ordinaryBkgColor;
        }
    };

    const handleClick = () => {
        if ( read_only || variant === "sensor") return;
        const command = variant === "switch" ? ( on ? "off" : "on" ) : "toggle";
        if  ( variant === "vacuum" ) doVacuumCommand(dev_id, doCommand, vac_status);
        else  doCommand(dev_id, command, "");
    };

    const setOrdinaryStatus = () => {
        setStatus("ordinary");
        clearInterval(timer);
        timer = null;
    };

    const onStatusUpdate = data => {
        if ( data.id !== dev_id ) return;
        setStatus(data.status);
    };

    // -------------------------------------------------------------

    const { classes, dev_id, read_only, variant, name, doCommand,
        sensor_type, on,  iconROColor, vac_status} = props;
    const [status, setStatus] = useState("ordinary");
    const { subscribe } = useContext(EventEmitter);

    let timer = null;
    const backgroundColor = getHeaderBackgroundColor(status);
    const cursor = (variant === "sensor") || read_only ? "default" : "pointer";
    useEffect( () => {
        subscribe("status", onStatusUpdate);
    },
    // eslint-disable-next-line
    []);

    return (
        <Paper className = { classes.paper } elevation = { 0 } style = { {backgroundColor:backgroundColor} }>
            <div className = { classes.root } >
                { variant === "light" || variant === "minGroup"  || variant === "switch" ?
                    <div>
                        <IconHeader
                            variant = { variant }
                            component_on = { on }
                            cssClass = { classes.icon }
                        />
                        { read_only ?
                            <Tooltip
                                title = 'Read only device'
                                placement = "top"
                            >
                                <SyncDisabled
                                    className = { classes.ro_icon }
                                    style = { {color: iconROColor} }
                                />
                            </Tooltip>
                            :
                            null
                        }
                    </div>
                    :
                    variant === "sensor" ?
                        <SensorHeaderIcon
                            sensor_type = { sensor_type }
                            cssClass = { classes.icon }
                        />
                        :
                        variant === "vacuum" ?
                            <div>
                                <VacuumStatusIcon
                                    vac_status = { vac_status }
                                    cssClass = { classes.icon }
                                />
                            </div>
                            :
                            null
                }

                <div
                    className = { classes.name }
                    onClick = { handleClick }
                    style = { {cursor:cursor} }
                >
                    <DeviceName name = { name }/>
                </div>
            </div>
        </Paper>
    );
};

ComponentHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    ordinaryBkgColor: PropTypes.string.isRequired,
    read_only: PropTypes.bool,
    variant: PropTypes.string,
    dev_id: PropTypes.string.isRequired,
    iconROColor: PropTypes.string,
    name: PropTypes.string.isRequired,
    on: PropTypes.bool,
    vac_status: PropTypes.string,
    sensor_type: PropTypes.string,
    doCommand: PropTypes.func
};

export default withStyles(styles)(ComponentHeader);