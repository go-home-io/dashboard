import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/Icon/Icon";

const styles = () => ({
    icon: {
        width: 25,
        height: 25,
        margin: 10,
        color: "#15d915",
    }
});

class SliderButton extends React.Component {

    render () {
        const { classes, action } = this.props;
        return (
            <Grid container justify = 'flex-end'>
                <IconButton
                    className = { classes.icon }
                    onClick = { action }
                >
                    <Icon>
                            done
                    </Icon>
                </IconButton>
            </Grid>
        );
    }
}

SliderButton.propTypes = {
    classes: PropTypes.object.isRequired,
    action: PropTypes.func.isRequired
};

export default withStyles(styles)(SliderButton);
