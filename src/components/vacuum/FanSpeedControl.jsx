import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import Popover from "@material-ui/core/Popover/Popover";
import Typography from "@material-ui/core/Typography/Typography";
import FanSpeedSlider from "./FanSpeedSlider";

const styles = () => ( {
    root: {
        marginTop: -6,
        marginLeft: 7,
    },
    text: {
        letterSpacing:1,
        cursor:"pointer",
    },
});

class  FanSpeedControl extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            anchorEl: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick (event) {
        this.setState({
            anchorEl: event.currentTarget,
        });
    }

    handleClose ()  {
        this.setState({
            anchorEl: null,
        });
    }

    render() {
        const { classes, level, dev_id, commands } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
                commands.includes("set-fan-speed") ?
                    <Grid container className={classes.root} justify='center'>
                        <div id="label"
                             className={classes.text}
                             onClick={this.handleClick}
                        >
                            <Typography variant='body1'>
                                Fan Speed:
                                {" "}
                                {level}
                                %
                            </Typography>
                        </div>
                        <Popover
                            id="simple-popper"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            <FanSpeedSlider
                                level={level}
                                close={this.handleClose.bind(this)}
                                dev_id={dev_id}
                            />
                        </Popover>
                    </Grid>
                    :
                    null

        );
    }
}

FanSpeedControl.propTypes = {
    classes: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    dev_id: PropTypes.string.isRequired,
    commands: PropTypes.array.isRequired
};

export default withStyles(styles)(FanSpeedControl);
