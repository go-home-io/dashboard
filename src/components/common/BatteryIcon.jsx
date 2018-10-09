import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const icons = (level) => {
    if (level >95) {
        return "battery-full";
    } else if (level > 50) {
        return "battery-three-quarters";
    } else if (level > 25) {
        return "battery-half";
    } else if (level > 10) {
        return "battery-quarter";
    } else {
        return "battery-empty";
    }
};

class BatteryIcon extends React.Component {
    render () {
        const { battery_level: raw_level, cssClass } = this.props;
        const battery_level = Math.round(raw_level);
        const icon = icons(battery_level);

        return (
            <div className = { cssClass.battery_root }>
                <div className = { cssClass.label }>
                    { battery_level }
                        %
                </div>
                <div className = { cssClass.icon }>
                    <FontAwesomeIcon icon = { icon } />
                </div>
            </div>
        );
    }
}

BatteryIcon.propTypes = {
    battery_level: PropTypes.number.isRequired,
    cssClass: PropTypes.object.isRequired
};

export default (BatteryIcon);

