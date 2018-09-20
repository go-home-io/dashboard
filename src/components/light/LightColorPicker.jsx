import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import ColorSliders from "./ColorSliders";
import Popover from "@material-ui/core/Popover/Popover";
import rgbColor from "../utils/rgbColor";
import Typography from "@material-ui/core/Typography/Typography";

const styles = () => ({
    root : {
        width:"100%",
        height: 21,
        marginTop: 2,
    },
    box: {
        border:"solid 1px #000",
        width:15,
        height:15,
        position:"relative",
        top:-20,
        left:86,
        cursor: "pointer",
    },
    text: {
        letterSpacing:1,
        cursor: "pointer",
    },
});


class LightColorPicker extends React.Component {
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

    render () {
        const { classes, color, read_only, dev_id } = this.props;
        const css_color = rgbColor(color);
        const cursor = read_only ? "default" : "pointer";
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <Grid container className = { classes.root }>
                <div
                    className = { classes.text }
                    onClick = { this.handleClick }
                    style = { {cursor:cursor} }
                >
                    <Typography variant = 'body1'>
                             Color:
                    </Typography>
                    <div className = { classes.box }
                        style = { {backgroundColor:css_color, cursor:cursor} }
                    />
                </div>
                <Popover
                    id = "simple-popper"
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
                    <ColorSliders
                        color = { color }
                        dev_id = { dev_id }
                        close = { this.handleClose }
                    />
                </Popover>
            </Grid>
        );
    }
}

LightColorPicker.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.object.isRequired,
    read_only:  PropTypes.bool,
    dev_id: PropTypes.string.isRequired,
};

export default withStyles(styles)(LightColorPicker);

