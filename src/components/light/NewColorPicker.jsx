import React, {Component} from 'react'
import Reflux from 'reflux'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import ColorSliders from "./ColorSliders";
import Popover from "@material-ui/core/Popover/Popover";
import rgbColor from "../utils/rgbColor";

const styles = theme => ({
    root : {
        width:'100%',
        marginTop: 2,
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
        cursor: 'pointer',
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

    render () {
        const {classes} = this.props;
        const color = rgbColor(this.props.color);

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            this.props.loading ? null :
                <Grid container  className={classes.root}>
                       {/*style={{marginTop:this.props.marginTop}}>*/}
                    <div className={classes.text} onClick={this.handleClick}>
                        Color:
                        <div className={classes.box}
                             style={{backgroundColor:color}}>
                        </div>
                    </div>
                    {/*<IconButton style={{ width:25, height:25}}*/}
                                {/*className={classes.button}*/}
                                {/*onClick={this.handleClick}*/}
                    {/*>*/}
                        {/*<ExpandMore style={{color:'grey'}}/>*/}
                    {/*</IconButton>*/}
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

