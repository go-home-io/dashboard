import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import TemperatureSymbol from "../common/TemperatureSymbol";

const styles = () => ({
    root: {
        marginTop: 0,
    },
    temperature: {
        color: "rgba(0, 0, 0, 0.54)",
    },
});

class Temperature extends React.Component {
    render () {
        const { classes, temperature } = this.props;
        let temperatureFormatted = 0;
        if ( temperature != null ) {
            temperatureFormatted = temperature.toFixed(1);
        }
        return (
            <div className = { classes.root }>
                { temperature != null ?
                    <Typography variant = 'subheading' align = 'center' className = { classes.temperature }>
                        <strong>
                            { temperatureFormatted }
                        </strong>
                        <TemperatureSymbol/>
                    </Typography> : null
                }

            </div>
        );
    }
}

Temperature.propTypes = {
    classes: PropTypes.object.isRequired,
    temperature: PropTypes.number,
};

export default withStyles(styles)(Temperature);

