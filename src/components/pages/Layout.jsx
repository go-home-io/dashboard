import React from "react";
import Notification from "../notification/Notification";
import PropTypes from "prop-types";
import ResponsiveDrawer from "../navigation/ResposiveDrawer";
import { withStyles } from "@material-ui/core/styles";

const style = () => ({
    body: {
        marginTop: 65,
    }
});

const Layout = (props) => {
    const { classes, dropdown, children, ...other } = props;
    return (
        <div className = { classes.body }>
            <ResponsiveDrawer dropdown = { dropdown } { ...other }>
                { children }
            </ResponsiveDrawer>
            <Notification/>
        </div>
    );
};

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    dropdown: PropTypes.object,
    children: PropTypes.array.isRequired
};

export default withStyles(style)(Layout);