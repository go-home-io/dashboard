import React from "react";
import Card from "@material-ui/core/Card/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import * as PropTypes from "prop-types";

const styles = () => ({
    root: {
        width: 172,
        height: 165,
        margin: 5,
    },
});

class MinimizedGroup extends React.Component {
    render () {
        const { classes } = this.props;
        return (
            <Card className = { classes.root }>
                Minimized Group
            </Card>
        );
    }
}

MinimizedGroup.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MinimizedGroup);