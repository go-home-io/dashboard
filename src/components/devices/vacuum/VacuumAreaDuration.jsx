import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import AppStore from "../../../reflux/application/AppStore";

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

class VacuumAreaDuration extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
    }
    render () {
        const { uom } = this.state;
        const { classes, area, duration } = this.props;
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
    }
}

VacuumAreaDuration.propTypes = {
    classes: PropTypes.object.isRequired,
    area: PropTypes.number,
    duration: PropTypes.number
};

export default withStyles(styles)(VacuumAreaDuration);

