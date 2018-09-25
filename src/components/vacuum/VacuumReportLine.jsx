import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import AppStore from "../../reflux/application/AppStore";

const styles = () => ({
    root: {
        // marginTop: 0,
        marginLeft: 10,
    },
    area: {
        // position: 'relative',
        // top: -35,
        // left: -19,
        marginTop: 0,
        color: "rgba(0, 0, 0, 0.54)",
    },

    duration: {
        // marginTop: 6,
        marginLeft:13,
        // display: 'inline-block',
        color: "rgba(0, 0, 0, 0.54)",
    },
    uom: {
        marginTop: 5,
        marginLeft: 3,
    }
});

class VacuumReportLine extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
    }
    render () {
        const { uom } = this.state;
        const {classes, area, duration} = this.props;
        const squareUnit = uom === "imperial" ? "ft" : "m";

        return (
            <Grid container justify = 'flex-start' className = { classes.root }>
                <Typography variant = 'subheading' align = 'left' className = { classes.area } >
                    <strong>
                        { area }
                    </strong>
                </Typography>
                <Typography variant = 'caption' align = 'left' className = { classes.uom }>
                    {squareUnit}
                    &sup2;
                </Typography>

                <Typography variant = 'subheading' align = 'left' className = { classes.duration } >
                    <strong>
                        { duration }
                    </strong>
                </Typography>
                <Typography variant = 'caption' align = 'left' className = { classes.uom } >
                    min
                </Typography>
            </Grid>
        );
    }
}

VacuumReportLine.propTypes = {
    classes: PropTypes.object.isRequired,
    area: PropTypes.number,
    duration: PropTypes.number
};

export default withStyles(styles)(VacuumReportLine);

