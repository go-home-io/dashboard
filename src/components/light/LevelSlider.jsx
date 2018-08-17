import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import lightActions from '../../reflux/lightActions'
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ( {
    root: {
        width: '100%',
        marginTop: 0,
    },
    text: {
        fontSize:12,
        letterSpacing:1,
        fontColor:'lightgray',
    }
});

class LevelSlider extends Reflux.Component {

    handleChange = (event, value) => {
        const level = Math.round(value);
        lightActions.setBrightness(this.props.dev_id, level);
    };

    render() {
        const { classes } = this.props;
        // const display = this.props.level ? 'block' : 'none';
        return (
            this.props.loading ? null :
            <Grid container className={classes.root} >
                <div id="label" className={classes.text}>
                    Brightness: {this.props.level}%
                </div>
                <Slider value={this.props.level}  onChange={this.handleChange} />
            </Grid>
        );
    }
}

LevelSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LevelSlider);
