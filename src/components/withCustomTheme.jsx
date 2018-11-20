import React from "react";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";

const theme = createMuiTheme( {
    palette: {
        primary: blue,
        secondary: pink,
    },
    // typography: {
    //     useNextVariants: true,
    // },
});

export const  withCustomTheme = (Component) => {

    return (
        <MuiThemeProvider theme = { theme } >
            <Component/>
        </MuiThemeProvider>
    );
};


