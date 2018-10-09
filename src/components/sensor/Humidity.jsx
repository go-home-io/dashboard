import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const styles = () => ({
    root: {
        marginTop: 0
    },
    humidity: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    uom: {
        display: "inline-block",
    }
});

class Humidity extends React.Component {
    render () {
        const {classes, humidity} = this.props;
        let humidityFormatted = 0;
        if ( humidity != null ) {
            humidityFormatted = humidity.toFixed(1);
        }
        return (
            <Grid container justify = 'flex-start' className = { classes.root }>
                { humidity != null ?
                    <div>
                        <Typography variant = 'subheading' align = 'center' className = { classes.humidity }>
                            <strong>
                                {humidityFormatted}
                            </strong>
                            <Typography variant = 'caption' className = { classes.uom } align = "left">
                                {"%"}
                            </Typography>
                        </Typography>

                    </div>
                    :
                    null
                }
            </Grid>
        );
    }
}

Humidity.propTypes = {
    classes: PropTypes.object.isRequired,
    humidity: PropTypes.number
};

export default withStyles(styles)(Humidity);

