import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon/Icon";

const icons = (level) => {
    if (level >95) {
        return <i className="fa fa-battery-full" aria-hidden="true"/>;
    } else if (level > 50) {
        return <i className="fa fa-battery-three-quarters" aria-hidden="true"/>;
    } else if (level > 25) {
        return <i className="fa fa-battery-half" aria-hidden="true"/>;
    } else if (level > 10) {
        return <i className="fa fa-battery-quarter" aria-hidden="true"/>;
    } else {
        return <i className="fa fa-battery-empty" aria-hidden="true"/>;
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
                <Icon className = { cssClass.icon }>
                    { icon }
                    {/*<i className = "fa fa-battery-three-quarters" aria-hidden = "true" />*/}
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

