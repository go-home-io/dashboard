import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography/Typography";

const style = () => ({
    root: {
        marginTop: 5,
    },
    icon: {
        display: "inline-block",
        marginTop: 0,
        marginLeft: 4,
        color: "rgba(0, 0, 0, 0.54)"
    },
});

const icons = (level) => {
    if (level >95) {
        return "battery-full";
    } else if (level > 60) {
        return "battery-three-quarters";
    } else if (level > 35) {
        return "battery-half";
    } else if (level > 10) {
        return "battery-quarter";
    } else {
        return "battery-empty";
    }
};

class Battery extends React.Component {
    render () {
        const { classes, battery_level: raw_level } = this.props;
        const battery_level = Math.round(raw_level);
        const icon = icons(battery_level);

        return (
            raw_level != null ?
                <div className = { classes.root }>
                    <Typography
                        variant = "caption"
                        align = "right"
                        color = "textSecondary"
                    >
                        <strong>
                            { battery_level }
                            %
                        </strong>
                        <span className = { classes.icon }>
                            <FontAwesomeIcon
                                icon = { icon }
                            />
                        </span>
                    </Typography>
                </div> :
                null
        );
    }
}

Battery.propTypes = {
    battery_level: PropTypes.number,
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(Battery);

