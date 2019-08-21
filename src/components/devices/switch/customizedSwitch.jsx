import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch/Switch";
import PropTypes from "prop-types";

const customizedSwitch = (props) => {
    const { checked, colorThumb, handleChange, disabled } = props;

    // Overrides the slider CSS
    const theme = createMuiTheme({
        overrides: {
            // Name of the component ⚛️ / style sheet
            MuiSwitch: {
                // Name of the rule
                iconChecked : {
                    backgroundColor: colorThumb,
                },
            },
        },
    });

    return (
        <MuiThemeProvider theme = { theme }>
            <Switch
                disabled = { disabled }
                checked = { checked }
                onChange = { handleChange }
                color = 'primary'
            />
        </MuiThemeProvider>
    );
};

customizedSwitch.propTypes = {
    checked: PropTypes.bool.isRequired,
    colorThumb: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};
export default customizedSwitch;
