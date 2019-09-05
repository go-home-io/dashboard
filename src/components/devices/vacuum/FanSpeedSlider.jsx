import React, {useState} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SlidersHeader from "../../common/slider/SlidersHeader";
// import vacuumActions from "../../../reflux/vacuum/vacuumActions";
import Slider from "@material-ui/core/Slider";
import SliderActions from "../../common/slider/SliderActions";

const styles = () => ({
    root : {
        marginTop:20,
        width:250,
        height:120,
        cursor: "default",
    },
    slider: {
        width:"86%",
        marginLeft: "7%"
    }
});

const FanSpeedSlider = props => {

    const handleChange = (event, value) => {
        const level = Math.floor(value);
        setValue(level);
    };

    const setFanSpeed = () => {
        doCommand(dev_id, "set-fan-speed", value);
        close();
    };

    const { classes, close, level, dev_id, doCommand } = props;
    const [value, setValue] = useState(level);

    return (
        <div className = { classes.root }>
            <SlidersHeader
                caption = 'Set Fan Speed'
                level = { value }
            />
            <div className = { classes.slider }>
                <Slider value = { value } onChange = { handleChange } />
            </div>
            <SliderActions
                save = { setFanSpeed }
                close = { close }
            />
        </div>
    );
};

FanSpeedSlider.propTypes = {
    classes: PropTypes.object.isRequired,
    dev_id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    doCommand: PropTypes.func.isRequired
};

export default withStyles(styles)(FanSpeedSlider);
