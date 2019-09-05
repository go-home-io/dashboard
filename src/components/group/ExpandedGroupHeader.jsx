import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import blue from "@material-ui/core/colors/blue";
import withStyles from "@material-ui/core/styles/withStyles";
import { GROUP_HEADER_ICON_COLOR_ON, GROUP_HEADER_ICON_COLOR_OFF } from "../../settings/colors";
import {IconButton, Paper, Typography} from "@material-ui/core";
import {AppContext} from "../../context/AppContextProvider";
import {oneWayCommands} from "../../settings/oneWayCommands";
import {EventEmitter} from "../../context/EventEmitter";

const styles = () => ({
    root: {
        marginLeft: "15%",
        width: "70%",
        height: 51,
        marginBottom: 20
    },
    text: {
        flexGrow: 1,
        // marginLeft: 30,
        marginTop: 10,
        display: "inline-block"
    },
    icon: {
        color: "rgba(0,0,0,0.56)",
        fontSize: 33,
        flexGrow: 1,
    },
    iconButton: {
        color: "rgba(0,0,0,0.56)",
        display: "inline-block",
        marginTop: 2,
        "&:hover": {
            color: blue[500],
        },
    }
});

const groupIcon = "devices_other";

const ExpandedGroupHeader = props => {

    const doCommand = (id, command, value) => {
        const mess = {
            id:id,
            cmd:command,
            value: value,
            oneWay: oneWayCommands.includes(command)
        };
        raiseEvent("command", mess); // Send command to socket
        // eslint-disable-next-line
        members.map( (member) => raiseEvent("loading", { id: member, loading: true })); // Update loading status to group members
    };

    const onMessage = (mess) => {
        if ( mess.id !== id ) return;
        setOn(mess.state.on);
    };

    const  minimizeGroup = () => {
        setGroup(null);
    };

    const handleGroupHeaderClick = () => {
        if ( ! readOnly ) {
            doCommand(id, "toggle", "");
        }
    };

    const { classes, id, groupObj, on: groupOn, members } = props;
    const { read_only: readOnly, name } = groupObj;
    const [on, setOn] = useState(groupOn);

    const { setGroup } = useContext(AppContext);
    const { raiseEvent, subscribe } = useContext(EventEmitter);

    const iconColor = on ? GROUP_HEADER_ICON_COLOR_ON : GROUP_HEADER_ICON_COLOR_OFF;
    const cursor = readOnly ? "default" : "pointer";

    useEffect( () => {
        subscribe("message", onMessage );
    },
    // eslint-disable-next-line
        []);

    return (
        <Paper elevation = { 4 } className = { classes.root }>

            <div style = { {display: "flex"} }>
                <Icon className = { classes.icon } style = { {color: iconColor} }>
                    { groupIcon }
                </Icon>

                <div
                    className = { classes.text }
                    onClick = { handleGroupHeaderClick }
                    style = { { cursor: cursor } }
                >
                    <Typography variant = "h6" color = "textSecondary">
                        { name }
                    </Typography>
                </div>

                <Tooltip
                    title = "Minimize the group window"
                    placement = "right"
                >
                    <IconButton
                        onClick = { minimizeGroup }
                        className = { classes.iconButton }
                    >
                        <IconExpandLess/>
                    </IconButton>
                </Tooltip>
            </div>

        </Paper>
    );
};

ExpandedGroupHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    groupObj: PropTypes.object.isRequired,
    on: PropTypes.bool.isRequired,
    members: PropTypes.array.isRequired
};

export default withStyles(styles)(ExpandedGroupHeader);