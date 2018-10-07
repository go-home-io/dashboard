import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";
import {SENSOR_ICON_COLOR_ON, SENSOR_ICON_COLOR_OFF} from "../../settings/colors";
import DoneOutline from "@material-ui/icons/DoneOutline";
import Done from "@material-ui/icons/Done";
import DoneAll from "@material-ui/icons/DoneAll";

const styles = () => ({
    root: {
        marginTop: 0,
    },
    icon: {
        color: "rgba(0,0,0,0.54)",
        fontSize: 26,
        margin:"5px 10px 0 10px",
    },
});

const color = (state) => {
    if (state) {
        return SENSOR_ICON_COLOR_ON;
    } else {
        return SENSOR_ICON_COLOR_OFF;
    }
};

class ButtonIcons extends React.Component {
    render () {
        const {classes, click, double_click, press} = this.props;

        return (
            <Grid container justify = 'center' alignItems = 'center' className = { classes.root }>
                <Tooltip title = { "Click: " + click } placement = "top">
                    <Done
                        className = { classes.icon }
                        style = { {color:color(click)} }
                    />

                </Tooltip>
                <Tooltip title = { "Double click: " + double_click } placement = "top">
                    <DoneAll
                        className = { classes.icon }
                        style = { {color:color(double_click)} }
                    />
                </Tooltip>
                <Tooltip title = { "Press: " + press } placement = "top">
                    <DoneOutline
                        className = { classes.icon }
                        style = { {color:color(press)} }
                    />
                </Tooltip>
            </Grid>

        );
    }
}

ButtonIcons.propTypes = {
    classes: PropTypes.object.isRequired,
    click: PropTypes.bool.isRequired,
    double_click: PropTypes.bool.isRequired,
    press: PropTypes.bool.isRequired
};

export default withStyles(styles)(ButtonIcons);

