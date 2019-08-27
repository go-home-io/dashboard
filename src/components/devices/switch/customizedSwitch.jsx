import React from "react";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";


const customizedSwitch = (props) => {
    const { checked, colorThumb, handleChange, disabled } = props;

    const PurpleSwitch = withStyles({
        switchBase: {
            color: "#cccccc",
            "&$checked": {
                color: colorThumb,
            },
            "&$checked + $track": {
                backgroundColor: colorThumb,
            },
        },
        checked: {},
        track: {},
    })(Switch);

    return (
        <PurpleSwitch
            disabled = { disabled }
            checked = { checked }
            onChange = { handleChange }
        />
    );
};

customizedSwitch.propTypes = {
    checked: PropTypes.bool.isRequired,
    colorThumb: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};
export default customizedSwitch;
