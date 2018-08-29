import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Popover from "@material-ui/core/Popover/Popover";
import BrightnessSlider from "./BrightnessSlider";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ( {
    root: {
        width: '100%',
        marginTop: -5,
    },
    text: {
        fontSize:12,
        letterSpacing:1,
        fontColor:'lightgray',
        cursor:'pointer',
    },

});

class LightBrightness extends React.Component {
    state={
        anchorEl: null
    };

    handleClick = event => {
        if ( ! this.props.read_only ) {
            this.setState({
                anchorEl: event.currentTarget,
            });
        }
    };


    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const cursor = this.props.read_only ? 'default' : 'pointer';

        return (
            // this.props.loading ? null :
            <Grid  className={classes.root} >
                 <div id="label" className={classes.text}
                                 onClick={this.handleClick}
                                 style={{cursor:cursor}}
                 >
                     <Typography variant='body1'>
                         Brightness: {this.props.level}%
                     </Typography>
                 </div>
                 <Popover
                     id="simple-popper"
                     open={open}
                     anchorEl={anchorEl}
                     onClose={this.handleClose}
                     anchorOrigin={{
                         vertical: 'top',
                         horizontal: 'left',
                     }}
                     transformOrigin={{
                         vertical: 'top',
                         horizontal: 'left',
                     }}
                 >

                     <BrightnessSlider level={this.props.level}
                                       close = {this.handleClose.bind(this)}
                                       dev_id = {this.props.dev_id}  />
                 </Popover>


            </Grid>
        );
    }
}

LightBrightness.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightBrightness);
