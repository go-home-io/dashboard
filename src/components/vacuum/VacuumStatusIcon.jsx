import React from "react";
import Reflux from "reflux";
import Icon from "@material-ui/core/Icon/Icon";
import {
    VACUUM_HEADER_ICON_COLOR_CLEANING,
    VACUUM_HEADER_ICON_COLOR_DOCKED,
    VACUUM_HEADER_ICON_COLOR_CHARGING,
    VACUUM_HEADER_ICON_COLOR_UNKNOWN,
    VACUUM_HEADER_ICON_COLOR_PAUSED,
    VACUUM_HEADER_ICON_COLOR_FULL
} from "../../settings/colors";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const statusMisc = {
    "icon": {
        "unknown": "contact_support",
        "paused": "pause_circle_outline",
        "docked": "dock",
        "charging": "battery_charging_full",
        "cleaning": "play_circle_outline",
        "full": "restore_from_trash",
    },
    "tip": {
        "unknown": "Unknown status",
        "paused": "Cleaning paused",
        "docked": "Vacuum is at the dock",
        "charging": "Vacuum is charging",
        "cleaning": "Vacuum is in a cleaning state",
        "full": "Vacuum dust bag is full",
    },
    "color": {
        "unknown": VACUUM_HEADER_ICON_COLOR_UNKNOWN,
        "paused": VACUUM_HEADER_ICON_COLOR_PAUSED,
        "docked": VACUUM_HEADER_ICON_COLOR_DOCKED,
        "charging": VACUUM_HEADER_ICON_COLOR_CHARGING,
        "cleaning": VACUUM_HEADER_ICON_COLOR_CLEANING,
        "full": VACUUM_HEADER_ICON_COLOR_FULL,
    }
};

class VacuumStatusIcon extends Reflux.Component {
    render () {
        const { vac_status, cssClass } = this.props;
        const icon = statusMisc.icon[vac_status];
        const tip = statusMisc.tip[vac_status];
        const color = statusMisc.color[vac_status];
        return (
            <Tooltip title = { tip } placement = "top">
                <Icon
                    className = { cssClass }
                    style = { {color: color} }
                >
                    { icon }
                </Icon>
            </Tooltip>
        );
    }
}

VacuumStatusIcon.propTypes = {
    vac_status: PropTypes.string.isRequired,
    cssClass: PropTypes.string.isRequired
};

export default VacuumStatusIcon;