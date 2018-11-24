import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from "@material-ui/core/Icon/Icon";
import Grid from "@material-ui/core/Grid/Grid";

const styles = () => ({
    root: {
        marginTop: 18,
    },
    save: {
        // fontSize: 14,
        marginRight: 5,
        "&:hover": {
            color: "#6bc46b",
        },
    },
    cancel: {
        // height: 32,
        // width: 32,
        // float: "left",
        // fontSize: 14,
        marginLeft:5,
        "&:hover": {
            color: "red",
        }
    }
});

class SliderActions extends React.Component {

    render () {
        const { classes, close, save } = this.props;
        return (
            <Grid

                container
                justify = "space-between"
                className = { classes.root }
            >
                <Grid item>
                    <IconButton
                        className = { classes.cancel }
                        size = "small"
                        onClick = { close }
                    >
                        <Icon>
                            {" "}
                            close
                            {" "}
                        </Icon>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        className = { classes.save }
                        size = "small"
                        onClick = { save }
                    >
                        <Icon >
                            {" "}
                            done_outline
                            {" "}
                        </Icon>
                    </IconButton>
                </Grid>
            </Grid>
        );
    }
}

SliderActions.propTypes = {
    classes: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
};

export default withStyles(styles)(SliderActions);
