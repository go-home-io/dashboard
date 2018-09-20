import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import RGBSlider from "./RGBSlider";
import rgbColor from "../utils/rgbColor";
import SlidersHeader from "./SlidersHeader";
import lightActions from "../../reflux/light/lightActions";
import SliderButton from "./SliderButton";

const styles = () => ({
    root : {
        marginTop:3,
        width:250,
        height:120,
        cursor: "default",
    },
    color: {
        width: 25,
        height: 25,
        float: "right",
    },
    icon: {
        width: 25,
        height: 25,
        margin: 10,
        color: "#15d915",
    }
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

    handleColorChange = colorName => (event, value) => {
        const color = Math.round(value);
        this.setState({ [colorName]: color });
    };

    setColor() {
        const { dev_id, close } = this.props;
        lightActions.setColor(dev_id, this.state);
        close();
    }

    render () {
        const { classes } = this.props;
        const { r, g, b } = this.state;
        const css_color = rgbColor(this.state);

        return (
            <div className = { classes.root }>
                <SlidersHeader
                    color = { css_color }
                    caption = 'Set color'
                />
                { RGBSlider(r, "#f50057","#e46363", this.handleColorChange("r")) }
                { RGBSlider(g, "green","lightgreen", this.handleColorChange("g")) }
                { RGBSlider(b, "blue","lightblue", this.handleColorChange("b")) }

                <SliderButton
                    action = { this.setColor.bind(this) }
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
 };

export default withStyles(styles)(ColorSliders);
