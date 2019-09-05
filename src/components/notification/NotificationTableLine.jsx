import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
    default: ErrorIcon,
};

const styles = theme => ({
    root: {
        width: 500
    },
    success: {
        color: green[600],
    },
    error: {
        color: theme.palette.error.dark,
    },
    info: {
        color: theme.palette.primary.dark,
    },
    warning: {
        color: amber[700],
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginLeft: 5

    },
    time: {
        marginLeft: 0
    }
});

const timeAgo = t => {
    let time = Math.round(t/1000);

    if ( time < 60 ) {
        return time.toString() + " s";
    } else if ( time < 60*60 ) {
        return Math.round(time/60).toString() + " min";
    } else if ( time < 60*60*24 ) {
        return Math.round(time/60/60).toString() + " hr";
    } else {
        return Math.floor(time/60/60/24).toString() + " day";
    }
};

const NotificationTableLine = (props) => {
    const { classes, status, created, origin, message } = props;
    const Icon = variantIcon[status];
    const date = new Date(created);
    const now = new Date();
    const intervalAgo = timeAgo(now - date);

    return (
        <div className = { classes.root }>
            <Grid container alignItems = "flex-start">

                <Grid item xs = { 2 } sm = { 1 } className = { classes.time }>
                    <Tooltip
                        title = { date.toString() }
                        placement = "top-start"
                    >
                        <Typography variant = "caption">
                            { intervalAgo }
                        </Typography>
                    </Tooltip>
                </Grid>

                <Grid item xs = { 1 } className = { classes[status] }>
                    <Icon className = { classNames(classes[status], classes.icon) }/>
                </Grid>

                <Grid item xs = { 9 } sm = { 8 }>
                    <Typography variant = "body2">
                        <strong>
                            { origin }
                        </strong>
                        {": "}
                        { message }
                    </Typography>
                </Grid>
            </Grid>
            <Divider/>
        </div>
    );
};

NotificationTableLine.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    origin: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default withStyles(styles)(NotificationTableLine);