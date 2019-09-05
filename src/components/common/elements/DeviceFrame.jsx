import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card/Card";
import PropTypes from "prop-types";

const style = () => ({
    root: {
        width:172,
        height:165,
        margin: 5,
    },
});

const DeviceFrame = (props) => {
    const { classes, children, visible, ...other } = props;
    const display = visible ? "block" : "none";
    return (
        <Card
            { ...other }
            className = { classes.root }
            style = { { display: display} }
        >
            { children }
        </Card>
    );
};

DeviceFrame.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    visible: PropTypes.bool.isRequired,
};

export default withStyles(style)(DeviceFrame);