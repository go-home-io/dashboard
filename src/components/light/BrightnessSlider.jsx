import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SlidersHeader from "./SlidersHeader";
import lightActions from "../../reflux/light/lightActions";
import Slider from "@material-ui/lab/Slider/Slider";
import SliderButton from "./SliderButton";

const styles = () => ({
    root : {
        marginTop:0,
        width:250,
        height:110,
        cursor: "default",
    },
    slider: {
        width:"90%",
        marginLeft:3
    }
});

class BrightnessSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.level,
        };
        this.setBrightness = this.setBrightness.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event, value) {
        const level = Math.floor(value);
        this.setState({ value:level });
    }

    setBrightness() {
        const { dev_id, close } = this.props;
        const { value } = this.state;
        lightActions.setBrightness(dev_id, value);
        close();
    }

    render () {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className = { classes.root }>
                <SlidersHeader
                    caption = 'Set brightness'
                    level = { value }
                />
                <div className = { classes.slider }>
                    <Slider value = { value } onChange = { this.handleChange } />
                </div>
                <SliderButton
                    action = { this.setBrightness.bind(this) }
                />
            </div>
        );
    }

}

BrightnessSlider.propTypes = {
    classes: PropTypes.object.isRequired,
    dev_id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired
};

export default withStyles(styles)(BrightnessSlider);
