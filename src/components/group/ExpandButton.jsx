import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import indigo from "@material-ui/core/colors/indigo";


const styles = () => ({
    iconButton: {
        position: "relative",
        top: -30,
        left: 144,
        borderRadius: "50%",
        fontSize: 18,
        color: "#cccccc",
        cursor: "pointer",
        height: 25,
        width: 25,
        "&:hover": {
            color: "#ffffff",
            backgroundColor: indigo[400],
        },
    }
});

const ExpandButton = props => {
    const { classes, expandGroup } = props;
    return (
        <div>
            <Tooltip
                title = "Expand the group window"
                placement = "bottom-start"
            >
                <div
                    color = "primary"
                    className = { classes.iconButton }
                    onClick = { expandGroup }
                >
                    <IconExpandMore/>
                </div>
            </Tooltip>
        </div>
    );
};

ExpandButton.propTypes = {
    classes: PropTypes.object.isRequired,
    expandGroup: PropTypes.func.isRequired,
};

export default withStyles(styles)(ExpandButton);

