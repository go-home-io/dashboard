import React from "react";
import Reflux from "reflux";
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
import ContactSupport from "@material-ui/icons/ContactSupport";
import PauseCircleOutline from "@material-ui/icons/PauseCircleOutline";
import Dock from "@material-ui/icons/Dock";
import BatteryChargingFull from "@material-ui/icons/BatteryChargingFull";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import RestoreFromTrash from "@material-ui/icons/RestoreFromTrash";

const statusMisc = {
    "icon": {
        "unknown": ContactSupport,
        "paused": PauseCircleOutline,
        "docked": Dock,
        "charging": BatteryChargingFull,
        "cleaning": PlayCircleOutline,
        "full": RestoreFromTrash,
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
        const IconSelected = statusMisc.icon[vac_status];
        const tip = statusMisc.tip[vac_status];
        const color = statusMisc.color[vac_status];
        return (
            <Tooltip title = { tip } placement = "top">
                <IconSelected
                    className = { cssClass }
                    style = { {color: color} }
                />

            </Tooltip>
        );
    }
}

VacuumStatusIcon.propTypes = {
    vac_status: PropTypes.string.isRequired,
    cssClass: PropTypes.string.isRequired
};

export default VacuumStatusIcon;