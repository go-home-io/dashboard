import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import lightActions from '../../reflux/lightActions'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Grid from "@material-ui/core/Grid/Grid";

const styles = {
    root: {
        width: '100%',
        marginTop: 0,
    },
    text: {
        fontSize:12,
        letterSpacing:1,
        fontColor:'lightgray',
    }
};

class LevelOnOffSliderSlider extends Reflux.Component {

    handleChange = (event, value) => {
        const level = Math.round(value/100)*100;
        // lightActions.setLevel(this.props.location, level);

    };

    render() {
        const { classes } = this.props;

        return (
            this.props.loading ? null :
            <Grid container className={classes.root}>
                <div id="label" className={classes.text}>
                    Brightness: {this.props.level}%
                </div>
                <Slider value={this.props.level}  onChange={this.handleChange} disabled/>
            </Grid>
        );
    }
}

LevelOnOffSliderSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LevelOnOffSliderSlider);
