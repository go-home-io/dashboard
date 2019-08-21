import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";
import TemperatureSymbol from "../../common/TemperatureSymbol";

const Temperature = (props) => {
    const { temperature } = props;
    let temperatureFormatted = 0;
    if ( temperature != null ) {
        temperatureFormatted = temperature.toFixed(1);
    }

    return (
        <div>
            { temperature != null &&
                <Typography
                    variant = 'subtitle1'
                    color = "textSecondary"
                >
                    <strong>
                        { temperatureFormatted }
                    </strong>
                    <TemperatureSymbol/>
                </Typography>
            }
        </div>
    );
};

Temperature.propTypes = {
    temperature: PropTypes.number,
};

export default (Temperature);

