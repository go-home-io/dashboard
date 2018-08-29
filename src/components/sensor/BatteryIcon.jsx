import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from "@material-ui/core/Icon/Icon";

const styles = theme => ({
     root: {
         position: 'relative',
         top: 3,
     },
    icon: {
        color: 'rgba(0, 0, 0, 0.54)',
        padding: '0 7px',
        position: 'relative',
        fontSize: 13,
        top: -15,
        left: 218,
    },
    label: {
        fontSize: 11,
        position: 'relative',
        left: 200,
        top:2,
    }

});

class BatteryIcon extends React.Component {

    render () {
        const {classes} = this.props;

        return (
                this.props.battery_level ?
                <div className={classes.root}>

                    <div className={classes.label}>
                        {this.props.battery_level}%
                    </div>
                    <Icon className={classes.icon}>
                        <i className="fa fa-battery-three-quarters" aria-hidden="true"> </i>
                    </Icon>

                </div> : null

        )
    }
}

BatteryIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BatteryIcon)

