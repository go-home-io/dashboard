import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import lightActions from '../reflux/lightActions'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
    root: {
        width: 120,
    },
};

class LevelSlider extends Reflux.Component {

    handleChange = (event, value) => {
        // alert(value);
        let level = Math.round(value/10)*10;
        lightActions.setLevel(this.props.location, level);
    };

    render() {
        const { classes } = this.props;
        // const { value } = this.props.level;

        return (
            <div className={classes.root}>
                {/*<Typography id="label">Slider label</Typography>*/}
                <Slider value={this.props.level}  onChange={this.handleChange} />
            </div>
        );
    }
}

LevelSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LevelSlider);
