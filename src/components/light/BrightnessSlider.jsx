import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SlidersHeader from "../common/SlidersHeader";
import Slider from "@material-ui/lab/Slider/Slider";
import SliderActions from "../common/SliderActions";

const styles = () => ({
    root : {
        marginTop: 8,
        width:250,
        height:110,
    },
    slider: {
        width:"90%",
        marginLeft:10,
        marginTop: 15,
        marginBottom: 25,
    }
});

class BrightnessSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.level,
        };
        this.setValue = this.setValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (event, value) {
        const level = Math.floor(value);
        this.setState({ value:level });
    }
    setValue() {
        const { dev_id, close, doCommand } = this.props;
        const { value } = this.state;
        doCommand(dev_id, "set-brightness", value);
        close();
    }
    render () {
        const { classes, close } = this.props;
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
                <SliderActions
                    save = { this.setValue }
                    close = { close }
                />
            </div>
        );
    }
}

BrightnessSlider.propTypes = {
    classes: PropTypes.object.isRequired,
    dev_id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    doCommand: PropTypes.func.isRequired,
};

export default withStyles(styles)(BrightnessSlider);
