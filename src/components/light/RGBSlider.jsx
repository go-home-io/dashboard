import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Slider from "@material-ui/lab/Slider/Slider";

function RGBSlider(value, colorThumb, colorTrack, handleChange) {
      // Overrides the slider CSS
      const theme = createMuiTheme({
        overrides: {
            // Name of the component ⚛️ / style sheet
            MuiSlider: {
                // Name of the rule
                root: {
                    width:'90%',
                    padding:'3px 10px',
                    marginTop:8,
                    marginLeft:3,
                },
                thumb : {
                    backgroundColor: colorThumb,
                },
                track: {
                    backgroundColor: colorTrack,
                }
            },
        },
    });


    return (
        <MuiThemeProvider theme={theme}>
            <Slider value={value}  max={255} onChange={handleChange} />
        </MuiThemeProvider>
    );
}

export default RGBSlider;
