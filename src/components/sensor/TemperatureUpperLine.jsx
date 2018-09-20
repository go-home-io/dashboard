import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TemperatureSymbol from "../common/TemperatureSymbol";
// import Grid from "@material-ui/core/Grid/Grid";

const styles = () => ({
    root: {
        marginTop: -42,
        marginLeft: 10,
    },
    temperature: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    humidity: {
        color: "rgba(0, 0, 0, 0.54)",
        marginLeft: 8,
        marginTop: 5,
    },
});

class TemperatureUpperLine extends React.Component {

    render () {
        const {classes, temperature, humidity} = this.props;

        return (
            <Grid container justify = 'flex-start' className = { classes.root }>
                { temperature ?
                    <Typography variant = 'subheading' align = 'center' className = { classes.temperature }>
                        <strong>
                            {temperature}
                        </strong>
                        <TemperatureSymbol/>
                    </Typography> : null
                }
                { humidity ?
                    <Typography variant = 'caption' align = 'center' className = { classes.humidity }>
                        Hmd:
                        {" "}
                        {humidity}
                        %
                    </Typography> : null
                }
            </Grid>
        );
    }
}

TemperatureUpperLine.propTypes = {
    classes: PropTypes.object.isRequired,
    temperature: PropTypes.number,
    humidity: PropTypes.number
};

export default withStyles(styles)(TemperatureUpperLine);

