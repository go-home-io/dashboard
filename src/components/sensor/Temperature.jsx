import React from 'react';
import Reflux from 'reflux'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import AppStore from "../../reflux/application/AppStore";
import TemperatureSymbol from "./TemperatureSymbol";

const styles = theme => ({
    root: {
       marginTop: 10,
    },
});

class Temperature extends Reflux.Component {

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

Temperature.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Temperature)

