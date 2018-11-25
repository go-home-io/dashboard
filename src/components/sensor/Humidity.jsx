import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const styles = () => ({
    uom: {
        display: "inline-block",
    }
});

const Humidity = (props) => {
    const {classes, humidity} = props;
    let humidityFormatted = 0;
    if ( humidity != null ) {
        humidityFormatted = humidity.toFixed(1);
    }

    return (
        <Grid container justify = 'flex-start'>
            { humidity != null &&
                <div>
                    <Typography variant = 'subtitle1' align = 'center' color = "textSecondary">
                        <strong>
                            {humidityFormatted}
                        </strong>
                        <Typography variant = 'caption' className = { classes.uom } align = "left">
                            {"%"}
                        </Typography>
                    </Typography>
                </div>
            }
        </Grid>
    );
};

Humidity.propTypes = {
    classes: PropTypes.object.isRequired,
    humidity: PropTypes.number
};

export default withStyles(styles)(Humidity);

