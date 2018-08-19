import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import lightActions from '../../reflux/lightActions'
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Popover from "@material-ui/core/Popover/Popover";
import ColorSliders from "./ColorSliders";
import Slider from "@material-ui/lab/Slider/Slider";
import BrightnessSlider from "./BrightnessSlider";

const styles = theme => ( {
    root: {
        width: '100%',
        marginTop: 0,
    },
    text: {
        fontSize:12,
        letterSpacing:1,
        fontColor:'lightgray',
    },
    button: {
        position: 'relative',
        top: -5,
        left: 10,
    },
});

class LightBrightness extends Reflux.Component {
    state={
        anchorEl: null
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    // handleChange = (event, value) => {
    //     const level = Math.round(value);
    //     lightActions.setBrightness(this.props.dev_id, this.state.value);
    // };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const { classes } = this.props;
        // const display = this.props.level ? 'block' : 'none';

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            this.props.loading ? null :
                <Grid container className={classes.root} >
                    <div id="label" className={classes.text}>
                        Brightness: {this.props.level}%
                    </div>
                    <IconButton style={{ width:25, height:25}}
                                className={classes.button}
                                aria-label="More"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                    >
                        <ExpandMore style={{color:'grey'}}/>
                    </IconButton>
                    <Popover
                        id="simple-popper"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >

                        <BrightnessSlider level={this.props.level}
                                          close = {this.handleClose.bind(this)}
                                          dev_id = {this.props.dev_id}  />
                    </Popover>


                </Grid>
        );
    }
}

LightBrightness.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightBrightness);
