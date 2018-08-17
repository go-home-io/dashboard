import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Collapse from "@material-ui/core/Collapse/Collapse";
import ColorSliders from "./ColorSliders";
import lightActions from "../../reflux/lightActions";

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
        cursor: 'pointer',
    },
    // button: {
    //     width:15,
    //     height:15,
    //     color:'gray',
    //
    // }
});


class LightColorPicker extends Component {
    state={ open:false,
            color: this.props.color
    };


    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleColorChange(color) {
        let state = this.state;
        state.color = color;
        this.setState(state);
          }

    handleSetColor(color) {
        this.setState(state => ({ open: !state.open}));
        lightActions.setColor(this.props.dev_id, this.state.color);
    }

    handleClose() {
        this.setState(state => ({ open: !state.open,
                                  color:this.props.color }));
    }

    render () {
        const {classes} = this.props;
        const color = 'rgb(' + this.state.color.r + ','
                             + this.state.color.g + ','
                             + this.state.color.b + ')';

        return (
                 this.props.loading ? null :
                    <Grid container
                          className={classes.root}
                    >
                            <div className={classes.text} onClick={this.handleClick}>
                                Color:
                                <div className={classes.box}
                                     style={{backgroundColor:color}}>
                                </div>
                            </div>

                        <Collapse in={this.state.open} className={classes.root} timeout="auto" unmountOnExit >
                            <ColorSliders color={this.state.color}
                                          close={this.handleClose.bind(this)}
                                          setParentState={this.handleColorChange.bind(this)}
                                          setColor={this.handleSetColor.bind(this)}
                            />

                        </Collapse>
                    </Grid>
        )
    }
}

LightColorPicker.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LightColorPicker)

