import React from 'react'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import ColorSliders from "./ColorSliders";
import Popover from "@material-ui/core/Popover/Popover";
import rgbColor from "../utils/rgbColor";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    root : {
        width:'100%',
        height: 21,
        marginTop: 2,
        // cursor: 'pointer',
    },
    box: {
        border:'solid 1px #000',
        width:15,
        height:15,
        position:'relative',
        top:-20,
        left:86,
        cursor: 'pointer',
    },
    text: {
        letterSpacing:1,
        cursor: 'pointer',
    },
});


class LightColorPicker extends React.Component {
    state={
            anchorEl: null
    };

    handleClick = event => {
        if ( !this.props.read_only ) {
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

    render () {
        const {classes} = this.props;
        const color = rgbColor(this.props.color);
        const cursor = this.props.read_only ? 'default' : 'pointer';
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            this.props.loading ? null :
                <Grid container  className={classes.root}>
                    <div className={classes.text}
                         onClick={this.handleClick}
                         style={{cursor:cursor}}
                    >
                        <Typography variant='body1'>
                             Color:
                        </Typography>
                        <div className={classes.box}
                             style={{backgroundColor:color, cursor:cursor}}>
                        </div>
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
                        <ColorSliders color={this.props.color}
                                      dev_id = {this.props.dev_id}
                                      close = {this.handleClose.bind(this)}
                        />

                    </Popover>
                </Grid>
        )
    }
}

LightColorPicker.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LightColorPicker)

