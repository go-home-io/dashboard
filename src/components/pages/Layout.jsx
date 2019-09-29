import React from "react";
import PropTypes from "prop-types";
import ResponsiveDrawer from "../navigation/ResposiveDrawer";
import { withStyles } from "@material-ui/core/styles";

const style = () => ({
    body: {
        marginTop: 65,
    }
});

const Layout = (props) => {
    const { classes, children, ...other } = props;
    return (
        <div className = { classes.body }>
            <ResponsiveDrawer { ...other }>
                { children }
            </ResponsiveDrawer>
        </div>
    );
};

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
};

export default withStyles(style)(Layout);