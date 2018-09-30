import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch/Switch";

function customizedSwitch(checked, colorThumb, handleChange) {
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
            <Switch checked = { checked } onChange = { handleChange } color = 'primary'/>
        </MuiThemeProvider>
    );
}

export default customizedSwitch;
