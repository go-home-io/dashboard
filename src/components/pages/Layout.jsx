import React from "react";
import Grid from "@material-ui/core/Grid";
import GoHomeAppBar from "../navigation/AppBar";
import NavBar from "../navigation/NavBar";
import Notification from "../notification/Notification";
import Hidden from "@material-ui/core/Hidden/Hidden";
import PropTypes from "prop-types";

const Layout = (props) => {
    const { dropdown, children } = props;
    return (
        <Grid container spacing = { 0 } justify = 'flex-start'>
            <Grid item xs = { 12 }>
                <GoHomeAppBar dropdown = { dropdown } />
            </Grid>
            <Hidden mdDown>
                <Grid item md = { 2 }>
                    <NavBar dropdown = { dropdown } />
                </Grid>
            </Hidden>

            <Grid item md = { 12 } lg = { 10 } >
                { children }
            </Grid>
            <Notification/>
        </Grid>
    );
};


Layout.propTypes = {
    dropdown: PropTypes.object,
    children: PropTypes.array.isRequired
};

export default (Layout);