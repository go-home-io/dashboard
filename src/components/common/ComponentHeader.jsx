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
        // marginLeft: 0,
        marginTop:-7,
        // marginBottom:0,
        width: "100%"
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
            return this.props.ordinaryBkgColor;
        }
    }

    handleClick () {
        if ( !this.props.read_only &&
               this.props.variant !== "sensor" ) {
            this.props.actions.toggle(this.props.dev_id);
        }
    }

    setOrdinaryStatus() {
        this.props.actions.status(this.props.dev_id, "ordinary");
    }

    render () {
        const {classes} = this.props;

        const backgroundColor = this.getHeaderBackgroundColor(this.props.status);
        const readOnly = this.props.read_only;
        const variantSensor = this.props.variant === "sensor";
        const cursor = variantSensor ? "default" :
            readOnly ? "default" : "pointer";
        const iconColor = variantSensor ? this.props.iconColorOn :
            this.props.on ? this.props.iconColorOn : this.props.iconColorOff;

        return (
            <Paper className = { classes.paper } elevation = { 0 } style = { {backgroundColor:backgroundColor} }>
                <div className = { classes.root } >

                    <Icon style = { {color: iconColor, cursor:cursor} }
                        className = { classes.icon }
                        onClick = { this.handleClick }
                    >
                        {this.props.icon}
                    </Icon>
                    { readOnly && !variantSensor ?
                        <Tooltip title = 'Read only device'
                            placement = "top"
                        >
                            <Icon className = { classes.ro_icon }
                                style = { {color:this.props.iconROColor} }
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
                        {this.props.name}
                    </Typography>
                </div>
            </Paper>
        );
    }
}

ComponentHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComponentHeader);