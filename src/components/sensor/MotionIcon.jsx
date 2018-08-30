import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from "@material-ui/core/Icon/Icon";

const styles = theme => ({
    icon: {
        position: 'relative',
        left: 99,
        top: -19,
        fontSize: 50,
    },
});


class MotionIcon extends React.Component {
    render () {
        const {classes} = this.props;
        const icon = this.props.on ? 'directions_walk' : 'hotel';
        const color = this.props.on ? '#ff0000a1' :  'rgba(0,0,0,0.3)';

        return (
            <Icon className={classes.icon} style={{color:color}}>
                {icon}
            </Icon>
        )
    }
}

MotionIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MotionIcon)

