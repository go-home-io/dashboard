import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import Popover from "@material-ui/core/Popover/Popover";
import BrightnessSlider from "./BrightnessSlider";
import Typography from "@material-ui/core/Typography/Typography";

const styles = () => ( {
    root: {
        // width: "100%",
        marginTop: -5,
    },
    text: {
        // fontSize:12,
        // letterSpacing: 5,
        cursor:"pointer",
    },
});

class LightBrightness extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            anchorEl: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClick (event) {
        const { read_only } = this.props;
        if ( ! read_only ) {
            this.setState({
                anchorEl: event.currentTarget,
            });
        }
    }
    handleClose ()  {
        this.setState({
            anchorEl: null,
        });
    }
    render() {
        const { classes, read_only, level, dev_id, doCommand } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const cursor = read_only ? "default" : "pointer";

        return (
            <Grid className = { classes.root } >
                <div id = "label" className = { classes.text }
                    onClick = { this.handleClick }
                    style = { {cursor:cursor} }
                >
                    <Typography variant = 'body1'>
                        {"Brightness:"}
                        { level !== 100 && " " }
                        { level }
                        {"%"}
                    </Typography>
                </div>
                <Popover
                    id = "brightness-popper"
                    open = { open }
                    anchorEl = { anchorEl }
                    onClose = { this.handleClose }
                    anchorOrigin = { {
                        vertical: "top",
                        horizontal: "left",
                    } }
                    transformOrigin = { {
                        vertical: "top",
                        horizontal: "left",
                    } }
                >
                    <BrightnessSlider
                        level = { level }
                        close = { this.handleClose.bind(this) }
                        dev_id = { dev_id }
                        doCommand = { doCommand }
                    />
                </Popover>
            </Grid>
        );
    }
}

LightBrightness.propTypes = {
    classes: PropTypes.object.isRequired,
    read_only: PropTypes.bool,
    level: PropTypes.number,
    dev_id: PropTypes.string.isRequired,
    doCommand: PropTypes.func.isRequired,
};

export default withStyles(styles)(LightBrightness);
