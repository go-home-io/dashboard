import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import  PropTypes from "prop-types";

const style = () => ({
    font: {
        letterSpacing: 1,
        fontSize: 18,
    }
});

const DeviceName = (props) => {
    const { classes, name } = props;

    return (
        <Typography variant = "subtitle1" color = "inherit">
            <span className = { classes.font }>
                { name }
            </span>
        </Typography>
    );
};

DeviceName.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};

export default withStyles(style)(DeviceName);