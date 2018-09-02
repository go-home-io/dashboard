import React from 'react'
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import Paper from "@material-ui/core/Paper/Paper";
import {HEADER_HIGHLIGHT_DURATION} from '../../settings/deviceDelays';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {SUCCESS_BKG_COLOR, ERROR_BKG_COLOR} from '../../settings/colors';

const success = SUCCESS_BKG_COLOR;
const error = ERROR_BKG_COLOR;

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 40,

    },
    root: {
        marginLeft: 0,
        marginTop:-7,
        marginBottom:0,
        width: '100%'
    },
    icon: {
        position: 'relative',
        left:-19,
        top:-10,
        padding:3,
        fontSize: 22,
        color: '#ffffffe6'
    },
    typography: {
        position: 'relative',
        left: 10,
        top: -28,
        color: "#ffffffe6",
    },
    ro_icon: {
        position: 'relative',
        left: -49,
        top: 32,
        fontSize: 21,
        color: '#ff9b9b'
    }
});

class ComponentHeader extends React.Component {
    timer = null;

    constructor(props) {
         super(props);
         this.handleClick = this.handleClick.bind(this);
         this.setOrdinaryStatus = this.setOrdinaryStatus.bind(this);
    }

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


    handleClick () {
         if (! this.props.read_only ) {
             // alert('Clicked by '+this.props.dev_id);
             this.props.actions.toggle(this.props.dev_id);
         }
     }

    setOrdinaryStatus() {
        this.props.actions.status(this.props.dev_id, 'ordinary');
    }

    render () {
        const {classes} = this.props;
        const iconColor =  this.props.on ? "#f2f0c2" : 'rgba(0,0,0,0.47)';
        const backgroundColor = this.getHeaderBackgroundColor(this.props.status);
        const readOnly = this.props.read_only;
        const cursor = readOnly ? 'default' : 'pointer';

        return (
            <Paper className={classes.paper} elevation={0} style={{backgroundColor:backgroundColor}}>
                <div className={classes.root} >

                         <Icon style={{color: iconColor, cursor:cursor}}
                               className={classes.icon}
                               onClick={this.handleClick}
                         >
                             {this.props.icon}
                         </Icon>
                        { readOnly ?
                            <Tooltip title='Read only device'
                                     placement="top"
                            >
                                <Icon className={classes.ro_icon}>
                                    sync_disabled
                                </Icon>
                            </Tooltip> : null
                        }

                         <Typography variant="subheading"
                                     className={classes.typography}
                                     onClick={this.handleClick}
                                     style={{cursor:cursor}}
                         >
                             {this.props.name}
                         </Typography>


                 </div>
            </Paper>
        )
    }
}

ComponentHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComponentHeader)