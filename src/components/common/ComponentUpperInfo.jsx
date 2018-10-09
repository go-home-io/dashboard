import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";

const styles = () => ({
    root: {
        widths: "100%",
        marginTop: 0,
    },
    left: {
        widths: "100%",
        float: "left",
        marginLeft: 10,
    },
    center: {
        widths: "100%",
        backgroundColor: "green",
    },
    right: {
        widths: "100%",
        float: "right",
        marginRight: 3,
    }
});

class ComponentUpperInfo extends React.Component {
    render () {
        const {classes, leftField, centerField, rightField} = this.props;

        return (
            <Grid container justify = 'center' className = { classes.root }>
                <Grid item xs = { 5 } >
                    <span className = { classes.left }>
                        { leftField }
                    </span>
                </Grid>
                <Grid item xs = { 3 } >
                    <span className = { classes.center }>
                        { centerField }
                    </span>
                </Grid>
                <Grid item xs = { 4 } >
                    <span className = { classes.right }>
                        {rightField}
                    </span>
                </Grid>
            </Grid>
        );
    }
}

ComponentUpperInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    leftField: PropTypes.object,
    centerField: PropTypes.object,
    rightField: PropTypes.object,
};

export default withStyles(styles)(ComponentUpperInfo);

