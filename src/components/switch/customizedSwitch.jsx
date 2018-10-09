import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch/Switch";

const customizedSwitch = (checked, colorThumb, handleChange, disabled) => {
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

export default customizedSwitch;
