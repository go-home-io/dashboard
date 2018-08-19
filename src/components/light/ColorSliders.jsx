import React from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import RGBSlider from "./RGBSlider";
import IconButton from "@material-ui/core/IconButton/IconButton";
import rgbColor from "../utils/rgbColor";
import Grid from "@material-ui/core/Grid/Grid";
import SlidersHeader from "./SlidersHeader";
import lightActions from "../../reflux/lightActions";

const styles = theme => ({
    root : {
        marginTop:0,
        width:250,
        height:120,
        cursor: 'default',
    },
    color: {
        width:25,
        height:25,
        float:'right',
  },
});

class ColorSliders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            r: props.color.r,
            g: props.color.g,
            b: props.color.b,
        };
        this.setColor = this.setColor.bind(this);
    }

    handleChangeRed(event, value) {
        const color = Math.round(value);
        let state = this.state;
        state.r = color;
        this.setState(state);

    }
    handleChangeGreen(event, value) {
        const color = Math.round(value);
        let state = this.state;
        state.g = color;
        this.setState(state);
    }
    handleChangeBlue(event, value) {
        const color = Math.round(value);
        let state = this.state;
        state.b = color;
        this.setState(state);
    }
    setColor() {
        // alert('SetColor'+this.props.dev_id);
        lightActions.setColor(this.props.dev_id, this.state);
        this.props.close();
    }

    render () {
        const {classes} = this.props;
        const color = rgbColor(this.state);

        return (
            <div className={classes.root}>
                <SlidersHeader color = {color}
                               caption = 'Set color'
                />

                {RGBSlider(this.state.r, '#f50057','#e46363', this.handleChangeRed.bind(this))}
                {RGBSlider(this.state.g, 'green','lightgreen', this.handleChangeGreen.bind(this))}
                {RGBSlider(this.state.b, 'blue','lightblue', this.handleChangeBlue.bind(this))}

                <Grid container justify='flex-start' className={classes.action}>
                    <IconButton onClick={this.setColor}
                                style={{width:25, height:25,margin:10}}>
                                <i className="material-icons">done</i>
                    </IconButton>
                </Grid>
            </div>
        )
    }

}

ColorSliders.propTypes = {

    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ColorSliders)
