import React from 'react'
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import Paper from "@material-ui/core/Paper/Paper";
import rgbColor from "../utils/rgbColor";
import {HEADER_HIGHLIGHT_DURATION} from '../../settings/deviceDelays';
// import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const normal =  '#c8edee5e';
const success = '#d2fad9';
const error = '#f44336';

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 10,
        backgroundColor:normal,
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

const iconBattery = 'battery_50';

class SensorHeader extends React.Component {
    timer = null;

    // constructor(props) {
    //     super(props);
    //     this.handleClick = this.handleClick.bind(this);
    //     this.setNormalStatus = this.setNormalStatus.bind(this);
    // }

    getHeaderBackgroundColor(status) {
        let bgColor = null;
        if ((status === 'success')) {
            bgColor = success;
        } else if (status === 'error') {
            bgColor = error;
        }
        if (bgColor) {
            clearInterval(this.timer);
            this.timer = setInterval(this.setNormalStatus, HEADER_HIGHLIGHT_DURATION);
            return bgColor;
        }
    }

    handleClick () {
        if (! this.props.read_only ) {
            // alert('Clicked by '+this.props.dev_id);
            this.props.actions.toggle(this.props.dev_id);
        }
    }

    setNormalStatus() {
        this.props.actions.status(this.props.dev_id, 'normal');
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

                    <Typography variant="subheading"
                                className={classes.typography}
                                onClick={this.handleClick}
                    >
                        {this.props.name}
                    </Typography>
                    {/*<Icon className={classes.battery}>*/}
                        {/*<i className="material-icons">*/}
                            {/*battery_50*/}
                        {/*</i>*/}

                    {/*</Icon>*/}
                </div>
            </Paper>
        )
    }
}

SensorHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SensorHeader)