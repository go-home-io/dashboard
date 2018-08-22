import React from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    root: {
        padding:'0 15px',
        marginTop:5,
    },

});

class SlidersHeader extends React.Component {

    render () {
        const color = (this.props.color);
        const {classes} = this.props;

        return (
            <Grid container justify='center' className={classes.root}>

                    <Typography variant="subheading" gutterBottom align="center">
                        {this.props.caption}
                    </Typography>

                { color ?
                        <div style={{ backgroundColor: color,
                                       width: 20,
                                       height: 20,
                                        position: 'relative',
                                        left: 75,
                                        top: 2,
                        }}>
                        </div> :
                        <div style={{ position: 'relative',
                                      left: 50,
                                      top: 2,
                                       }}>
                            <Typography variant="body1" gutterBottom align="center">
                                {this.props.level}%
                            </Typography>
                        </div>
                }
            </Grid>        )
    }
}

SlidersHeader.popTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SlidersHeader)