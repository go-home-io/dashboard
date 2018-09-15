import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({

    root: {
        marginTop: 0,
    },

});

class Weather extends React.Component {

    render () {
        const {classes} = this.props;

        return (

            <div className={classes.root}>
                <Typography variant='subheading' align='center'>
                    {this.props.temperature} F
                </Typography>
                <Typography variant='body1' align='center'>
                    Humidity {this.props.humidity}%
                </Typography>
            </div>
        )
    }
}

Weather.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Weather)

