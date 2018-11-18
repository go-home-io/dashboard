import React from "react";
import Notification from "../notification/Notification";
import PropTypes from "prop-types";
import ResponsiveDrawer from "../navigation/ResposiveDrawer";

const Layout = (props) => {
    const { dropdown, children } = props;
    return (
        <div >
            <ResponsiveDrawer
                dropdown = { dropdown }
            >
                { children }
            </ResponsiveDrawer>
            <Notification/>
        </div>
    );
};


Layout.propTypes = {
    dropdown: PropTypes.object,
    children: PropTypes.array.isRequired
};

export default (Layout);