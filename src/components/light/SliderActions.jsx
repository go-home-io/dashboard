import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from "@material-ui/core/Icon/Icon";

const styles = () => ({
    root: {
        marginTop: 12,
    },
    save: {
        height: 32,
        width: 32,
        float: "right",
        fontSize: 14,
        marginRight: 15,
        // color: "#6bc46b",
    },
    cancel: {
        height: 32,
        width: 32,
        float: "left",
        fontSize: 14,
        marginLeft:15,
    }
});

class SliderActions extends React.Component {

    render () {
        const { classes, close, save } = this.props;
        return (
            <div className = { classes.root }>
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
                <IconButton
                    className = { classes.save }
                    size = "small"
                    onClick = { save }
                    color = 'primary'
                >
                    <Icon >
                        {" "}
done_outline
                        {" "}
                    </Icon>
                </IconButton>
            </div>
        );
    }
}

SliderActions.propTypes = {
    classes: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
};

export default withStyles(styles)(SliderActions);
