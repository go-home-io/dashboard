import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import "typeface-roboto/index.css";

export const customTheme = createMuiTheme( {
    palette: {
        primary: blue,
        secondary: pink,
    },
    typography: {
        useNextVariants: true,
    },
});
