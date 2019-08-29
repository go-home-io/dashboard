import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper/Paper";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { HEADER_HIGHLIGHT_DURATION } from "../../../settings/deviceDelays";
import { SUCCESS_BKG_COLOR, ERROR_BKG_COLOR } from "../../../settings/colors";
import IconHeader from "../elements/IconHeader";
import SensorHeaderIcon from "../../devices/sensor/SensorHeaderIcon";
import VacuumStatusIcon from "../../devices/vacuum/VacuumStatusIcon";
import SyncDisabled from "@material-ui/icons/SyncDisabled";
import DeviceName from "../elements/DeviceName";

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        height: 38,
    },
    root: {
        marginTop:-7,
        width: "100%",
        height: "100%",
    },
    icon: {
        position: "relative",
        left:-19,
        top:-10,
        padding:3,
        fontSize: 22,
    },
    name: {
        position: "relative",
        left: 12,
        top: -36,
        color: "#fff",
    },
    ro_icon: {
        position: "relative",
        left: -47,
        top: 30,
        fontSize: 21,
    }
});

class ComponentHeader extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.handleClick = this.handleClick.bind(this);
        this.setOrdinaryStatus = this.setOrdinaryStatus.bind(this);
    }
    getHeaderBackgroundColor(status) {
        const { ordinaryBkgColor } = this.props;
        let bgColor = null;

        if ((status === "success")) {
            bgColor = SUCCESS_BKG_COLOR;
        } else if (status === "error") {
            bgColor = ERROR_BKG_COLOR;
        }
        if (bgColor) {
            clearInterval(this.timer);
            this.timer = setInterval(this.setOrdinaryStatus, HEADER_HIGHLIGHT_DURATION);
            return bgColor;
        } else {
            return ordinaryBkgColor;
        }
    }
    handleClick () {
        const { read_only, variant, actions, dev_id } = this.props;
        if ( ! read_only && variant !== "sensor" ) {
            actions.toggle(dev_id);
        }
    }
    setOrdinaryStatus() {
        const { dev_id, actions } = this.props;
        actions.status(dev_id, "ordinary");
        clearInterval(this.timer);
        this.timer = null;
    }

    render () {
        const { classes, status, read_only, variant, name,
            sensor_type, on,  iconROColor, vac_status} = this.props;

        const backgroundColor = this.getHeaderBackgroundColor(status);
        const cursor = (variant === "sensor") || read_only ? "default" : "pointer";

        return (
            <Paper className = { classes.paper } elevation = { 0 } style = { {backgroundColor:backgroundColor} }>
                <div className = { classes.root } >
                    { variant === "light" || variant === "minGroup"  || variant === "switch" ?
                        <div>
                            <IconHeader
                                variant = { variant }
                                component_on = { on }
                                cssClass = { classes.icon }
                            />
                            { read_only ?
                                <Tooltip
                                    title = 'Read only device'
                                    placement = "top"
                                >
                                    <SyncDisabled
                                        className = { classes.ro_icon }
                                        style = { {color: iconROColor} }
                                    />
                                </Tooltip>
                                :
                                null
                            }
                        </div>
                        :
                        variant === "sensor" ?
                            <SensorHeaderIcon
                                sensor_type = { sensor_type }
                                cssClass = { classes.icon }
                            />
                            :
                            variant === "vacuum" ?
                                <div>
                                    <VacuumStatusIcon
                                        vac_status = { vac_status }
                                        cssClass = { classes.icon }
                                    />
                                </div>
                                :
                                null
                    }

                    <div
                        className = { classes.name }
                        onClick = { this.handleClick }
                        style = { {cursor:cursor} }
                    >
                        <DeviceName name = { name }/>
                    </div>
                </div>
            </Paper>
        );
    }
}

ComponentHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    ordinaryBkgColor: PropTypes.string.isRequired,
    read_only: PropTypes.bool,
    variant: PropTypes.string,
    actions: PropTypes.object.isRequired,
    dev_id: PropTypes.string.isRequired,
    iconROColor: PropTypes.string,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    on: PropTypes.bool,
    vac_status: PropTypes.string,
    sensor_type: PropTypes.string
};

export default withStyles(styles)(ComponentHeader);