import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const AppBarPlaceholder = () => {
    return(
        <AppBar position = "fixed" color = "primary" style = { { height:64 } }>
            <Toolbar classes = { {} }>
                <Typography variant = "h6" color = "inherit">
                    GO-HOME
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default (AppBarPlaceholder);