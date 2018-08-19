import React from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Grid from "@material-ui/core/Grid/Grid";
import SlidersHeader from "./SlidersHeader";
import lightActions from "../../reflux/lightActions";
import Slider from "@material-ui/lab/Slider/Slider";

const styles = theme => ({
    root : {
        marginTop:0,
        width:250,
        height:110,
        cursor: 'default',
    },
    color: {
        width:25,
        height:25,
        float:'right',
    },
});

class BrightnessSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             value: props.level,
        };
        this.setBrightness = this.setBrightness.bind(this);
    }

    handleChange = (event, value) => {
        const level = Math.floor(value);
        this.setState({ value:level });
    };

    setBrightness() {
        lightActions.setBrightness(this.props.dev_id, this.state.value);
        this.props.close();
    }

    render () {
        const {classes} = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <SlidersHeader caption = 'Set brightness'
                               level={this.state.value} />
                <div style={{width:'90%', marginLeft:3}}>
                    <Slider value={value}  onChange={this.handleChange} />
                </div>

                <Grid container justify='flex-start' className={classes.action}>
                    <IconButton onClick={this.setBrightness}
                                style={{width:25, height:25,margin:10}}>
                        <i className="material-icons">done</i>
                    </IconButton>
                </Grid>
            </div>
        )
    }

}

BrightnessSlider.propTypes = {

    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrightnessSlider)
