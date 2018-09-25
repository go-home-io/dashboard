import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import RGBSlider from "./RGBSlider";
import rgbColor from "../utils/rgbColor";
import SlidersHeader from "../common/SlidersHeader";
import lightActions from "../../reflux/light/lightActions";
import SliderActions from "../common/SliderActions";

const styles = () => ({
    root : {
        marginTop:10,
        width:250,
        height:120,
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
        const { classes, close } = this.props;
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
};

export default withStyles(styles)(ColorSliders);
