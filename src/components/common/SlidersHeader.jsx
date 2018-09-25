import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
    root: {
        padding:"0 15px",
        marginTop:5,
    },
    colorBox: {
        width: 20,
        height: 20,
        position: "relative",
        left: 75,
        top: 2,
    },
    level: {
        position: "relative",
        left: 50,
        top: 2,
    }
});

class SlidersHeader extends React.Component {

    render () {
        const {classes, color, caption, level} = this.props;

        return (
            <Grid container justify = 'center' className = { classes.root }>
                <Typography variant = "subheading" gutterBottom align = "center">
                    { caption }
                </Typography>
                { color ?
                    <div
                        className = { classes.colorBox }
                        style = { {backgroundColor: color} }
                    /> :
                    <div className = { classes.level } >
                        <Typography variant = "body1" gutterBottom align = "center">
                            {level}
                            %
                        </Typography>
                    </div>
                }
            </Grid>
        );
    }
}

SlidersHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    color:PropTypes.string,
    caption: PropTypes.string.isRequired,
    level: PropTypes.number
};

export default withStyles(styles)(SlidersHeader);