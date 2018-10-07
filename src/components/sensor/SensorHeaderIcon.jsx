import React from "react";
import Icon from "@material-ui/core/Icon/Icon";
import { SENSOR_HEADER_ICON_COLOR } from "../../settings/colors";
import PropTypes from "prop-types";
import { getSensorHeaderIcon } from "./sensorMisc";

class SensorHeaderIcon extends React.Component {
    render () {
        const { sensor_type, cssClass } = this.props;
        const iconColor = SENSOR_HEADER_ICON_COLOR;
        const IconSelected = getSensorHeaderIcon(sensor_type);

        return (
            <div
                className = { cssClass }
                style = { {color:iconColor} }
            >
                {IconSelected}
            </div>

        );
    }
}

SensorHeaderIcon.propTypes = {
    sensor_type: PropTypes.string.isRequired,
    cssClass: PropTypes.string
};

export default SensorHeaderIcon;