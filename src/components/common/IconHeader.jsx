import React from "react";
import {
    SWITCH_HEADER_ICON_COLOR_ON,
    SWITCH_HEADER_ICON_COLOR_OFF,
    LIGHT_HEADER_ICON_COLOR_ON,
    LIGHT_HEADER_ICON_COLOR_OFF
} from "../../settings/colors";
import PropTypes from "prop-types";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const icons = {
    "light": WbIncandescentIcon,
    "switch": PowerSettingsNewIcon
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
        const SelectedIcon = icons[variant];
        const iconColor = colors[variant][component_on.toString()];

        return (
            <SelectedIcon
                className = { cssClass }
                style = { {color:iconColor} }
            />
        );
    }
}

IconHeader.propTypes = {
    component_on: PropTypes.bool.isRequired,
    cssClass: PropTypes.string,
    variant: PropTypes.string.isRequired,
};

export default IconHeader;