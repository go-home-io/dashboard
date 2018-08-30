import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({

    root: {
       marginTop: 5,
    },


});

class Temperature extends React.Component {

    render () {
        const {classes} = this.props;

        return (

            <div className={classes.root}>
                <Typography variant='display1' align='center'>
                    {this.props.temperature} F
                </Typography>
                <Typography variant='body1' align='center'>
                   Humidity {this.props.humidity}%
                </Typography>
            </div>
        )
    }
}

Temperature.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Temperature)

