import React from "react";
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper/Paper";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {HEADER_HIGHLIGHT_DURATION} from "../../settings/deviceDelays";
import {SUCCESS_BKG_COLOR, ERROR_BKG_COLOR} from "../../settings/colors";
// import Grid from "@material-ui/core/Grid/Grid";

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
        color: "#ffffffe6",
    },
    ro_icon: {
        position: "relative",
        left: -49,
        top: 32,
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
        const { classes, status, read_only, variant, name, iconColorOn,
            on, iconColorOff, icon, ro_icon, iconROColor} = this.props;

        const backgroundColor = this.getHeaderBackgroundColor(status);
        //  const read_only = this.props.read_only;
        const variantSensor = (variant === "sensor");
        const cursor = variantSensor ? "default" :
            read_only ? "default" : "pointer";
        const iconColor = variantSensor ? iconColorOn :
            on ? iconColorOn : iconColorOff;

        return (
            <Paper className = { classes.paper } elevation = { 0 } style = { {backgroundColor:backgroundColor} }>
                <div className = { classes.root } >

                    <Icon style = { {color: iconColor, cursor:cursor} }
                        className = { classes.icon }
                        onClick = { this.handleClick }
                    >
                        { icon }
                    </Icon>
                    { read_only && !variantSensor ?
                        <Tooltip title = 'Read only device'
                            placement = "top"
                        >
                            <Icon className = { ro_icon }
                                style = { {color: iconROColor} }
                            >
                                    sync_disabled
                            </Icon>
                        </Tooltip> : null
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
    actions: PropTypes.func.isRequired,
    dev_id: PropTypes.string.isRequired,
    iconColorOn: PropTypes.string,
    iconColorOff: PropTypes.string,
    iconROColor: PropTypes.string,
    icon: PropTypes.string,
    ro_icon: PropTypes.string,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    on: PropTypes.bool
};

export default withStyles(styles)(ComponentHeader);