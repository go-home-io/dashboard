import React from 'react'
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import Paper from "@material-ui/core/Paper/Paper";
import {HEADER_HIGHLIGHT_DURATION} from '../../settings/deviceDelays';
import {SUCCESS_BKG_COLOR, ERROR_BKG_COLOR} from '../../settings/colors';
import sensorActions from "../../reflux/sensor/sensorActions";


const success = SUCCESS_BKG_COLOR;
const error = ERROR_BKG_COLOR;

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 10,
     },
    root: {
        marginLeft: 0,
        marginTop:-7,
        marginBottom:0,
        width: '100%'
    },
    icon: {
        position: 'relative',
        left:-10,
        top:-5,
        padding:3,
        fontSize: 22,
        color: 'rgba(0, 0, 0, 0.54)'
    },
    typography: {
        position: 'relative',
        left: 23,
        top: -32,
    },
    battery: {
        position: 'relative',
        left: 190,
        top:-300,
        padding:3,
        fontSize: 22,
        color: 'rgba(0, 0, 0, 0.54)'
    }

});

class SensorHeader extends React.Component {
    timer = null;

    getHeaderBackgroundColor(status) {
        let bgColor = null;
        if ((status === 'success')) {
            bgColor = success;
        } else if (status === 'error') {
            bgColor = error;
        }
        if (bgColor) {
            clearInterval(this.timer);
            this.timer = setInterval(this.setOrdinaryStatus, HEADER_HIGHLIGHT_DURATION);
            return bgColor
        } else {
            return this.props.ordinaryBkgColor
        }
    }

    setOrdinaryStatus() {
        sensorActions.status(this.props.dev_id, 'ordinary');
    }

    render () {
        const {classes} = this.props;
        const backgroundColor = this.getHeaderBackgroundColor(this.props.status);

        return (
            <Paper className={classes.paper} elevation={0} style={{backgroundColor:backgroundColor}}>
                <div className={classes.root} >

                    <Icon className={classes.icon} >
                        {this.props.icon}
                    </Icon>

                    <Typography variant="subheading" className={classes.typography} >
                        {this.props.name}
                    </Typography>

                </div>
            </Paper>
        )
    }
}

SensorHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SensorHeader)