import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import vacuumActions from "../../reflux/vacuum/vacuumActions";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from "@material-ui/core/Icon/Icon";

const styles = () => ( {
    root: {
        width: "100%",
        marginTop: 9,
    },
    button: {
        fontSize: 17,
        height:25,
        width: 25,
        marginRight: 6
    }
});

const accessibilityRules = {
    "unknown": {
        "start": true,
        "stop": true,
        "find": true,
        "dock": true
    },
    "paused": {
        "start": true,
        "stop": true,
        "find": true,
        "dock": true
    },
    "docked":  {
        "start": true,
        "stop": false,
        "find": false,
        "dock": false
    },
    "charging":  {
        "start": false,
        "stop": false,
        "find": false,
        "dock": false
    },
    "cleaning":  {
        "start": true,
        "stop": true,
        "find": true,
        "dock": true
    },
    "full":  {
        "start": false,
        "stop": false,
        "find": true,
        "dock": false
    },
};

const startPauseButtonRules = {
    "cleaning": {
        "icon": "pause",
        "command": "pause"
    },
    "unknown": {
        "icon": "play_arrow",
        "command": "on"
    },
    "paused": {
        "icon": "play_arrow",
        "command": "on"
    },
    "charging": {
        "icon": "play_arrow",
        "command": "on"
    },
    "docked": {
        "icon": "play_arrow",
        "command": "on"
    },
    "full": {
        "icon": "play_arrow",
        "command": "on"
    },
};

class CommandPanel extends React.Component {

    handleClick = command => ()  => {
        // alert(command);
        const { dev_id } = this.props;
        vacuumActions[command](dev_id);
    };

    render() {
        const { classes, vac_status } = this.props;
        const { start, stop, find, dock } = accessibilityRules[vac_status];
        const { icon, command} = startPauseButtonRules[vac_status];
        // alert("Start:"+start+" Stop:"+stop);
        return (
            <Grid container justify = 'center' className = { classes.root } >
                <IconButton
                    className = { classes.button }
                    aria-label = "Start"
                    color = "primary"
                    disabled = { ! start }
                    onClick = { this.handleClick(command) }
                >
                    <Icon> 
                        {" "}
                        { icon }
                        {" "}
                    </Icon>
                </IconButton>
                <IconButton
                    className = { classes.button }
                    aria-label = "Stop"
                    disabled = { ! stop }
                    color = "secondary"
                    onClick = { this.handleClick("off") }
                >
                    <Icon>
                        {" "}
stop
                        {" "}
                    </Icon>
                </IconButton>
                <IconButton
                    className = { classes.button }
                    aria-label = "Dock"
                    color = "primary"
                    disabled = { ! dock }
                    onClick = { this.handleClick("dock") }
                >
                    <Icon>
                        {" "}
save_alt
                        {" "}
                    </Icon>
                </IconButton>
                <IconButton
                    className = { classes.button }
                    aria-label = "Find me"
                    color = "primary"
                    disabled = { ! find }
                    onClick = { this.handleClick("findMe") }
                >
                    <Icon>
                        {" "}
                        map-pin
                        {" "}
                    </Icon>
                </IconButton>

            </Grid>
        );
    }
}

CommandPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    vac_status: PropTypes.string.isRequired,
    dev_id: PropTypes.string.isRequired
};

export default withStyles(styles)(CommandPanel);
