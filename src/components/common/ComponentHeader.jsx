import React from "react";
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper/Paper";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { HEADER_HIGHLIGHT_DURATION } from "../../settings/deviceDelays";
import { SUCCESS_BKG_COLOR, ERROR_BKG_COLOR } from "../../settings/colors";
import IconHeader from "../common/IconHeader";
import SensorHeaderIcon from "../sensor/SensorHeaderIcon";
import VacuumStatusIcon from "../vacuum/VacuumStatusIcon";
import SyncDisabled from "@material-ui/icons/SyncDisabled";

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
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
    typography: {
        position: "relative",
        left: 10,
        top: -28,
        color: "#ffffffff",
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
    }

    render () {
        const { classes, status, read_only, variant, name,
            sensor_type, on,  iconROColor, vac_status} = this.props;

        const backgroundColor = this.getHeaderBackgroundColor(status);
        const variantSensor = (variant === "sensor");
        const cursor = variantSensor ? "default" :
            read_only ? "default" : "pointer";

        return (
            <Paper className = { classes.paper } elevation = { 0 } style = { {backgroundColor:backgroundColor} }>
                <div className = { classes.root } >
                    {variant === "light" ?
                        <div>
                            <IconHeader
                                variant = 'light'
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
                                variant === "switch" ?
                                    <div>
                                        <IconHeader
                                            component_on = { on }
                                            variant = "switch"
                                            cssClass = { classes.icon }
                                        />
                                        { read_only ?
                                            <Tooltip title = 'Read only device'
                                                placement = "top"
                                            >
                                                <Icon
                                                    className = { classes.ro_icon }
                                                    style = { {color: iconROColor} }
                                                >
                                            sync_disabled
                                                </Icon>
                                            </Tooltip>
                                            :
                                            null
                                        }

                                    </div>
                                    :
                                    null
                    }

                    <Typography variant = "subheading"
                        className = { classes.typography }
                        onClick = { this.handleClick }
                        style = { {cursor:cursor} }
                    >
                        { name }
                    </Typography>
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