import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import GoHomeAppBar from "../navigation/AppBar";
import Hidden from "@material-ui/core/Hidden/Hidden";
import NavBar from "../navigation/NavBar";
import StatusManager from "../status/StatusManager";
import Typography from "@material-ui/core/Typography/Typography";
import * as PropTypes from "prop-types";

class StatusPage extends React.Component {
    render () {
        const { access, status, worker} = this.props;
        const dropdownInfo =   {
            name: "Workers",
            icon: "edit_location",
            items: [{name:"", icon:""}],
        } ;

        return (
            <Grid
                container
                spacing = { 0 }
                justify = 'flex-start'
            >
                <Grid item xs = { 12 }>
                    <GoHomeAppBar
                        source = "status"
                        dropdown = { dropdownInfo }
                    />
                </Grid>
                <Hidden mdDown>
                    <Grid item md = { 2 }>
                        <NavBar
                            source = "status"
                            dropdown = { dropdownInfo }
                        />
                    </Grid>
                </Hidden>
                <Grid item md = { 12 } lg = { 10 } >
                    { access ?
                        <StatusManager
                            status = { status }
                            worker = { worker }
                        /> :
                        <Typography
                            style = { { marginTop: 100 } }
                            variant = "display4"
                            align = "center"
                        >
                            Access Denied
                        </Typography>
                    }
                </Grid>
            </Grid>
        );
    }
}

StatusPage.propTypes = {
    access: PropTypes.bool.isRequired,
    status: PropTypes.array.isRequired,
    worker: PropTypes.array.isRequired
};

export default StatusPage;