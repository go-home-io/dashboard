import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon/Icon";

const styles = () => ({
    root: {
        position: "relative",
        top: 2,
    },
    icon: {
        color: "rgba(0, 0, 0, 0.54)",
        padding: "0 7px",
        position: "relative",
        fontSize: 13,
        top: -13,
        left: 144,
    },
    label: {
        fontSize: 11,
        position: "relative",
        left: 126,
        top:4,
    }

});

class BatteryIcon extends React.Component {

    render () {
        const {classes, battery_level} = this.props;

        return (
            battery_level ?
                <div className = { classes.root }>
                    <div className = { classes.label }>
                        {battery_level}
                        %
                    </div>
                    <Icon className = { classes.icon }>
                        <i className = "fa fa-battery-three-quarters" aria-hidden = "true" />
                    </Icon>

                </div> : null

        );
    }
}

BatteryIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    battery_level: PropTypes.number
};

export default withStyles(styles)(BatteryIcon);

