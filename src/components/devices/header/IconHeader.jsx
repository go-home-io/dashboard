import React from "react";
import {
    SWITCH_HEADER_ICON_COLOR_ON,
    SWITCH_HEADER_ICON_COLOR_OFF,
    LIGHT_HEADER_ICON_COLOR_ON,
    LIGHT_HEADER_ICON_COLOR_OFF,
    MIN_GROUP_HEADER_ICON_COLOR_ON,
    MIN_GROUP_HEADER_ICON_COLOR_OFF,
    LOCK_HEADER_ICON_COLOR_ON,
    LOCK_HEADER_ICON_COLOR_OFF
} from "../../../settings/colors";
import PropTypes from "prop-types";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const icons = {
    "light": WbIncandescentIcon,
    "switch": PowerSettingsNewIcon,
    "minGroup": DevicesOtherIcon,
    "lock": "door-closed"
};

const colors = {
    "light": {
        "true" : LIGHT_HEADER_ICON_COLOR_ON,
        "false" : LIGHT_HEADER_ICON_COLOR_OFF
    },
    "switch": {
        "true" : SWITCH_HEADER_ICON_COLOR_ON,
        "false" : SWITCH_HEADER_ICON_COLOR_OFF
    },
    "minGroup": {
        "true" : MIN_GROUP_HEADER_ICON_COLOR_ON,
        "false" : MIN_GROUP_HEADER_ICON_COLOR_OFF
    },
    "lock": {
        "true" : LOCK_HEADER_ICON_COLOR_ON,
        "false" : LOCK_HEADER_ICON_COLOR_OFF
    }
};

class IconHeader extends React.Component {
    render () {
        const { component_on, cssClass, variant } = this.props;
        const SelectedIcon = icons[variant];
        const iconColor = colors[variant][component_on.toString()];

        return (
            variant === "lock" ?
                <FontAwesomeIcon icon = { component_on? "door-open" : "door-closed" }
                    style = { {
                        color:iconColor,
                        position: "relative",
                        left:-23,
                        top:-7,
                        padding:3,
                        fontSize: 22,
                    } }
                />
                :
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