import React, {useContext} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import {AppContext} from "../../../context/AppContextProvider";

const styles = () => ({
    uom: {
        marginTop: 5,
        marginLeft: 3,
        display: "inline-block",
        textAlign:"left"
    },
    duration: {
        marginLeft: -6,
        textAlign:"left"
    },
    area: {
        textAlign:"left"
    }
});

const VacuumAreaDuration = props => {
    const { uom } = useContext(AppContext);
    const { classes, area, duration } = props;
    const squareUnit = uom === "imperial" ? "ft" : "m";

    return (
        <div>
            { area != null &&
                <Typography
                    variant = "subtitle1"
                    className = { classes.area }
                    color = "textSecondary"
                >
                    <strong>
                        {area}
                    </strong>
                    <Typography
                        variant = "caption"
                        color = "textSecondary"
                        className = { classes.uom }
                    >
                        {squareUnit}
                        &sup2;
                    </Typography>
                </Typography>
            }
            { duration != null &&
                <Typography
                    variant = "subtitle1"
                    color = "textSecondary"
                    className = { classes.duration }
                >
                    <strong>
                        {duration}
                    </strong>
                    <Typography
                        variant = "caption"
                        color = "textSecondary"
                        className = { classes.uom }
                    >
                        { "min" }
                    </Typography>
                </Typography>
            }
        </div>
    );
};

VacuumAreaDuration.propTypes = {
    classes: PropTypes.object.isRequired,
    area: PropTypes.number,
    duration: PropTypes.number
};

export default withStyles(styles)(VacuumAreaDuration);

