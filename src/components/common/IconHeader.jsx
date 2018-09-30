import React from "react";
import Icon from "@material-ui/core/Icon/Icon";
import {
    SWITCH_HEADER_ICON_COLOR_ON,
    SWITCH_HEADER_ICON_COLOR_OFF,
    LIGHT_HEADER_ICON_COLOR_ON,
    LIGHT_HEADER_ICON_COLOR_OFF
} from "../../settings/colors";
import PropTypes from "prop-types";

const icons = {
    "light": "wb_incandescent",
    "switch": "power_settings_new"
};

const colors = {
    "light": {
        "true" : LIGHT_HEADER_ICON_COLOR_ON,
        "false" : LIGHT_HEADER_ICON_COLOR_OFF
    },
    "switch": {
        "true" : SWITCH_HEADER_ICON_COLOR_ON,
        "false" : SWITCH_HEADER_ICON_COLOR_OFF
    }
};

class IconHeader extends React.Component {
    render () {
        const { component_on, cssClass, variant } = this.props;
        const icon = icons[variant];
        // const variant = component_on.toString();
        const iconColor = colors[variant][component_on.toString()];

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

IconHeader.propTypes = {
    component_on: PropTypes.bool.isRequired,
    cssClass: PropTypes.string,
    variant: PropTypes.string.isRequired,
};

export default IconHeader;