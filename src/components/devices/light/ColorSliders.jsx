import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import RGBSlider from "./RGBSlider";
import rgbColor from "../../../utils/rgbColor";
import SlidersHeader from "../../common/SlidersHeader";
import SliderActions from "../../common/SliderActions";

const styles = () => ({
    root : {
        marginTop: 8,
        width:250,
        height:150,
    },
    color: {
        width: 25,
        height: 25,
        float: "right",
    },
});

class ColorSliders extends React.Component {
    constructor(props) {
        super(props);
        const { r: red, g: green, b: blue } = props.color;
        this.state = {
            r: red,
            g: green,
            b: blue,
        };
        this.setColor = this.setColor.bind(this);
    }
    handleColorChange = colorName => (event, value) => {
        const color = Math.round(value);
        this.setState({ [colorName]: color });
    };
    setColor() {
        const { dev_id, close, doCommand } = this.props;
        doCommand(dev_id, "set-color", this.state);
        close();
    }
    render () {
        const { classes, close } = this.props;
        const { r: red, g: green, b: blue } = this.state;
        const css_color = rgbColor(this.state);

        return (
            <div className = { classes.root }>
                <SlidersHeader
                    color = { css_color }
                    caption = 'Set color'
                />
                <RGBSlider
                    value = { red }
                    colorThumb = { "#f50057" }
                    colorTrack = { "#e46363" }
                    handleChange = { this.handleColorChange("r") }
                />
                <RGBSlider
                    value = { green }
                    colorThumb = { "green" }
                    colorTrack = { "lightgreen" }
                    handleChange = { this.handleColorChange("g") }
                />
                <RGBSlider
                    value = { blue }
                    colorThumb = { "blue" }
                    colorTrack = { "lightblue" }
                    handleChange = { this.handleColorChange("b") }
                />
                <SliderActions
                    close = { close }
                    save = { this.setColor }
                />
            </div>
        );
    }
}

ColorSliders.propTypes = {
    classes: PropTypes.object.isRequired,
    dev_id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    color: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired
};

export default withStyles(styles)(ColorSliders);
