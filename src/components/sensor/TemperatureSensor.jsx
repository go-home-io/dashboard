import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TemperatureSymbol from "../common/TemperatureSymbol";

const styles = theme => ({
    root: {
       marginTop: 10,
    },
});

class TemperatureSensor extends React.Component {

    render () {
        const {classes} = this.props;

        return (

            <Grid container justify='center' alignItems='center'>
                <Grid item xs={12} className={classes.root}>
                    <Typography variant='display1' align='center'>
                        {this.props.temperature}
                        <TemperatureSymbol/>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body1' align='center'>
                       Humidity {this.props.humidity}%
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

TemperatureSensor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemperatureSensor)

