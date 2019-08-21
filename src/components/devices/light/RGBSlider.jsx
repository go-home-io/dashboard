import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider/Slider";
import PropTypes from "prop-types";

function RGBSlider(props) {
    const { value, colorThumb, colorTrack, handleChange } = props;

    // Overrides the slider CSS
    const theme = createMuiTheme({
        overrides: {
            // Name of the component ⚛️ / style sheet
            MuiSlider: {
                // Name of the rule
                root: {
                    width:"90%",
                    padding:"3px 10px",
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
        <MuiThemeProvider theme = { theme }>
            <Slider value = { value } max = { 255 } onChange = { handleChange } />
        </MuiThemeProvider>
    );
}

RGBSlider.propTypes = {
    value: PropTypes.number.isRequired,
    colorThumb: PropTypes.string.isRequired,
    colorTrack: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};
export default RGBSlider;
