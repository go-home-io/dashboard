import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    icon: {
        color: 'rgba(0,0,0,0.54)',
        fontSize: 50,
        marginTop: -10,
    },
});

class Lock extends React.Component {
    render () {
        const {classes} = this.props;
        const icon = this.props.on ? 'lock' : 'lock_open';
        const state = this.props.on ? 'closed' : 'open';

        return (
            <Grid container justify='center' alignItems='center'>
            <Tooltip title={"Lock " + state} placement="top">
                <Icon className={classes.icon}>
                    {icon}
                </Icon>
            </Tooltip>
            </Grid>
        )
    }
}

Lock.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Lock)

