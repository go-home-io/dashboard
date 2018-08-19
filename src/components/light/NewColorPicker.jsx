import React, {Component} from 'react'
import Reflux from 'reflux'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Collapse from "@material-ui/core/Collapse/Collapse";
import ColorSliders from "./ColorSliders";
import lightActions from "../../reflux/lightActions";
import LightStoreFactory from "../../reflux/LightStore";
import Popover from "@material-ui/core/Popover/Popover";
import Button from "@material-ui/core/Button/Button";
import rgbColor from "../utils/rgbColor";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
    root : {
        marginTop:0,
        width:'100%',
        // cursor: 'pointer',
    },
    box: {
        display: 'inline-block',
        border:'solid 1px #000',
        width:15,
        height:15,
        marginLeft:10,
        position:'relative',
        top:5,
        cursor: 'pointer',
    },
    text: {
        fontSize:12,
        letterSpacing:1,
        fontColor:'lightgray',

    },
    button: {
        position: 'relative',
        top: 1,
        left: 10,
    },

});


class NewColorPicker extends Reflux.Component {
    state={
            anchorEl: null
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    // handleColorChange(color) {
    //     let state = this.state;
    //     state.color = color;
    //     this.setState(state);
    // }

    // handleSetColor(color) {
    //     // this.setState(state => ({ open: !state.open}));
    //     lightActions.setColor(this.props.dev_id, this.state.color);
    //     this.setState(state => ({ open: !state.open,
    //         color:this.props.color }));
    //
    // }

    render () {
        const {classes} = this.props;
        const color = rgbColor(this.props.color);

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            this.props.loading ? null :
                <Grid container className={classes.root} >
                    <div className={classes.text}>
                        Color:
                        <div className={classes.box}
                             style={{backgroundColor:color}}>
                        </div>
                    </div>
                    <IconButton style={{ width:25, height:25}}
                                className={classes.button}
                                onClick={this.handleClick}
                    >
                        <ExpandMore style={{color:'grey'}}/>
                    </IconButton>
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

NewColorPicker.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewColorPicker)

