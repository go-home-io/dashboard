import React from "react";
import Icon from "@material-ui/core/Icon/Icon";
import { SENSOR_HEADER_ICON_COLOR } from "../../settings/colors";
import PropTypes from "prop-types";
import { getSensorHeaderIcon } from "./sensorIcons";

class SensorHeaderIcon extends React.Component {
    render () {
        const { sensor_type, cssClass } = this.props;
        const iconColor = SENSOR_HEADER_ICON_COLOR;
        const icon = getSensorHeaderIcon(sensor_type);

        return (
            <Icon
                className = { cssClass }
                style = { {color:iconColor} }
            >
                { icon }
            </Icon>
        );
    }
}

SensorHeaderIcon.propTypes = {
    sensor_type: PropTypes.string.isRequired,
    cssClass: PropTypes.string
};

export default SensorHeaderIcon;