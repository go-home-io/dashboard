import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import IconExpandMore from "@material-ui/icons/ExpandMore";

const styles = () => ({
    iconButton: {
        marginTop: 2,
        marginLeft: 5,
        color: "#ccc",
        cursor: "pointer",
        height: 25,
        width: 25,
        "&:hover": {
            color: "#fff"
        },
    }
});

class ExpandButton extends React.Component {
    render () {
        const { classes, expandGroup, visible } = this.props;
        return (
            visible ?
                <div>
                    <Tooltip
                        title = "Expand the group window"
                        placement = "bottom-start"
                    >
                        <IconButton
                            color = "primary"
                            className = { classes.iconButton }
                            onClick = { expandGroup }
                        >
                            <IconExpandMore/>
                        </IconButton>
                    </Tooltip>
                </div>
                :
                null
        );
    }
}

ExpandButton.propTypes = {
    classes: PropTypes.object.isRequired,
    expandGroup: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
};

export default withStyles(styles)(ExpandButton);

