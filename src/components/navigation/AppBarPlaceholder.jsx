import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class AppBarPlaceholder extends React.Component {

    render() {
        return(
            <div>
                <AppBar position = "fixed" color = "default">
                    <Toolbar>
                        <Typography variant = "title" color = "textSecondary">
                            GO-HOME
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default (AppBarPlaceholder);