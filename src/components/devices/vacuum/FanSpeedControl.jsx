import React, {useState} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import Popover from "@material-ui/core/Popover/Popover";
import Typography from "@material-ui/core/Typography/Typography";
import FanSpeedSlider from "./FanSpeedSlider";

const styles = () => ( {
    root: {
        marginTop: -12,
        marginLeft: 2,
    },
    text: {
        letterSpacing:1,
        cursor:"pointer",
    },
});

const  FanSpeedControl = (props) => {

    const handleClick  = event => setAbchorEl(event.currentTarget);

    const handleClose = () => setAbchorEl(null);

    const { classes, level, dev_id, commands, doCommand } = props;
    const [anchorEl, setAbchorEl] = useState(null);
    const open = Boolean(anchorEl);

    return (
        commands.includes("set-fan-speed") &&
        <Grid container className = { classes.root } justify = 'center'>
            <div id = "label"
                className = { classes.text }
                onClick = { handleClick }
            >
                <Typography variant = 'body1'>
                        Fan Speed:
                    {" "}
                    {level}
                        %
                </Typography>
            </div>
            <Popover
                id = "simple-popper"
                open = { open }
                anchorEl = { anchorEl }
                onClose = { handleClose }
                anchorOrigin = { {
                    vertical: "top",
                    horizontal: "left",
                } }
                transformOrigin = { {
                    vertical: "top",
                    horizontal: "left",
                } }
            >
                <FanSpeedSlider
                    level = { level }
                    close = { handleClose }
                    dev_id = { dev_id }
                    doCommand = { doCommand }
                />
            </Popover>
        </Grid>
    );
};

FanSpeedControl.propTypes = {
    classes: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    dev_id: PropTypes.string.isRequired,
    commands: PropTypes.array.isRequired,
    doCommand: PropTypes.func.isRequired
};

export default withStyles(styles)(FanSpeedControl);
