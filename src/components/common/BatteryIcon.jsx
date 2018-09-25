import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon/Icon";

class BatteryIcon extends React.Component {
    render () {
        const { battery_level, cssClass } = this.props;
        return (
            <div className = { cssClass.battery_root }>
                <div className = { cssClass.label }>
                    { battery_level }
                        %
                </div>
                <Icon className = { cssClass.icon }>
                    <i className = "fa fa-battery-three-quarters" aria-hidden = "true" />
                </Icon>
            </div>
        );
    }
}

BatteryIcon.propTypes = {
    battery_level: PropTypes.number.isRequired,
    cssClass: PropTypes.object.isRequired
};

export default (BatteryIcon);

