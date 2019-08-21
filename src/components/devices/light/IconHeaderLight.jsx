import React from "react";
import Icon from "@material-ui/core/Icon/Icon";
import { LIGHT_HEADER_ICON_COLOR_ON, LIGHT_HEADER_ICON_COLOR_OFF } from "../../../settings/colors";
import PropTypes from "prop-types";

const lightIcon = "wb_incandescent";

const colors = {
    "true" : LIGHT_HEADER_ICON_COLOR_ON,
    "false" : LIGHT_HEADER_ICON_COLOR_OFF
};

class IconHeaderLight extends React.Component {
    render () {
        const { light_on, cssClass } = this.props;
        const variant = light_on.toString();
        const iconColor = colors[variant];

        return (
            <Icon
                className = { cssClass }
                style = { {color:iconColor} }
            >
                { lightIcon }
            </Icon>
        );
    }
}

IconHeaderLight.propTypes = {
    light_on: PropTypes.bool.isRequired,
    cssClass: PropTypes.string
};

export default IconHeaderLight;