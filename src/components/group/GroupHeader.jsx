import React from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/es/Icon/Icon";
import Typography from "@material-ui/core/es/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginBottom:10,
        height:15,
        backgroundColor:'#e8e7e836',
    },
    grid: {
        margin:-4,
        cursor: 'pointer',
    },
    typography: {
        marginLeft: 10,
    }
});

class GroupHeader extends React.Component{

    handleClick() {
        alert('click');

    }

    render () {

        const {classes} = this.props;
        const color = 'primary';

        return (
            <Paper className={classes.root} elevation={3}>
                <Grid container
                      className={classes.grid}
                      onClick = {this.handleClick}
                >
                    <Icon color={color}
                          className={classes.icon} >
                        wb_sunny
                    </Icon>

                    <Typography variant="subheading"
                                className={classes.typography} >

                        {this.props.title}
                    </Typography>
                </Grid>
            </Paper>
        )
    }
}

GroupHeader.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupHeader)