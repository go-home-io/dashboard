import React from 'react'
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import Paper from "@material-ui/core/Paper/Paper";
import rgbColor from "../utils/rgbColor";
import {HEADER_HIGHLIGHT_DURATION} from '../../settings/deviceDelays';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import truncateCaption from '../utils/truncate';
import {SUCCESS_BKG_COLOR, ERROR_BKG_COLOR} from '../../settings/colors';

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
        left:-12,
        top:-5,
        padding:3,
        fontSize: 22,
        color: 'rgba(0, 0, 0, 0.54)'
    },
    typography: {
        position: 'relative',
        left: 20,
        top: -32,
    },
    ro_icon: {
        position: 'relative',
        left: 191,
        top:-58,
        padding:3,
        fontSize: 22,
        color: 'rgba(0, 0, 0, 0.54)'
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
        const iconColor =  this.props.on ? '#ffa500d1' : 'rgba(0,0,0,0.54)';
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

                         <Typography variant="subheading"
                                     className={classes.typography}
                                     onClick={this.handleClick}
                                     style={{cursor:cursor}}
                         >
                             {truncateCaption(this.props.name, 20)}
                         </Typography>
                         { readOnly ?
                             <Tooltip title='Read only device'
                                      placement="top"
                             >
                                 <Icon className={classes.ro_icon}>
                                     sync_disabled
                                 </Icon>
                             </Tooltip> : null
                         }

                 </div>
            </Paper>
        )
    }
}

ComponentHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComponentHeader)