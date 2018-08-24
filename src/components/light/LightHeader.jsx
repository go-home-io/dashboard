import React from 'react'
import Reflux from 'reflux'
import lightActions from "../../reflux/lightActions"
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import rgbColor from "../utils/rgbColor";
import {HEADER_HIGHLIGHT_DURATION} from '../../settings/delays';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const normal = '#e8e7e836';
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
    },
    icon: {
        float:'left',
        cursor:'pointer',
        marginLeft: 3,
    },
    typography: {
        float:'left',
        marginLeft:3,
        cursor:'pointer',
    },
    ro_icon: {
        float: 'right',
        color: rgbColor({r:120,g:120,b:120}),
    }
});

function truncateName(name) {
     if ( name.length <= 19) {
         return name
     } else {
         return name.substr(0,17) + '..'
     }
}

class LightHeader extends React.Component {
     timer = null;

     constructor(props) {
         super(props);
         this.handleClick = this.handleClick.bind(this);
         this.setStatus = this.setStatus.bind(this);
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
            this.timer = setInterval(this.setStatus, HEADER_HIGHLIGHT_DURATION);
            return bgColor;
        }
    }

        handleClick () {
         if (! this.props.read_only ) {
             lightActions.toggle(this.props.dev_id);
         }
    }

    setStatus() {
        lightActions.status(this.props.dev_id, 'normal');
    }

    render () {
        const {classes} = this.props;
        const iconColor =  this.props.on ? 'orange' : rgbColor({r:100,g:100,b:100});
        const backgroundColor = this.getHeaderBackgroundColor(this.props.status);
        const readOnly = this.props.read_only;
        const cursor = readOnly ? 'default' : 'pointer';
        // classes.icon.cursor = readOnly ? 'default' : 'pointer';


        return (
            <Paper className={classes.paper} elevation={0} style={{backgroundColor:backgroundColor}}>
                <div className={classes.root} >

                         <Icon style={{color: iconColor, cursor:cursor}}
                               className={classes.icon}
                               onClick={this.handleClick}
                         >
                             <i className="fa fa-lightbulb-o" aria-hidden="true"> </i>
                         </Icon>

                         <Typography variant="subheading"
                                     className={classes.typography}
                                     onClick={this.handleClick}
                                     style={{cursor:cursor}}
                         >
                             {truncateName(this.props.name)}
                         </Typography>
                         { readOnly ?
                             <Tooltip title='Read only device'
                                      placement="top"
                             >
                                 <Icon className={classes.ro_icon}>
                                     sync_disabled
                                 </Icon>
                             </Tooltip>
                                        : null
                         }

                 </div>
            </Paper>
        )
    }
}

LightHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightHeader)