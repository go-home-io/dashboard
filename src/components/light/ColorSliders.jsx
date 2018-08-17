import React from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/es/styles/withStyles";
import RGBSlider from "./RGBSlider";
import IconButton from "@material-ui/core/IconButton/IconButton";

const styles = theme => ({
    root : {
        marginTop:0,
        width:'90%',
        cursor: 'default',
        marginRight: 0,
    },
    button: {
        width: 15,
        height: 15,
    }
});

class ColorSliders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            r: props.color.r,
            g: props.color.g,
            b: props.color.b,
        };
    }

    handleChangeRed(event, value) {
        const color = Math.round(value);
        let state = this.state;
        state.r = color;
        this.setState(state);

        this.props.setParentState(this.state);
    }
    handleChangeGreen(event, value) {
        const color = Math.round(value);
        let state = this.state;
        state.g = color;
        this.setState(state);
        this.props.setParentState(this.state);
    }
    handleChangeBlue(event, value) {
        const color = Math.round(value);
        let state = this.state;
        state.b = color;
        this.setState(state);
        this.props.setParentState(this.state);
    }
    setColor() {
        alert('SetColor');
    }
    onCloseClick() {
        this.props.close();
    }

    render () {
        const {classes} = this.props;

        return (
            <div className={classes.root}>

                {RGBSlider(this.state.r, '#f50057','#e46363', this.handleChangeRed.bind(this))}
                {RGBSlider(this.state.g, 'green','lightgreen', this.handleChangeGreen.bind(this))}
                {RGBSlider(this.state.b, 'blue','lightblue', this.handleChangeBlue.bind(this))}
                    <IconButton onClick={this.onCloseClick.bind(this)}
                                style={{width:25, height:25, float:'left', marginTop:10}}>
                        <i className="material-icons">
                            clear
                        </i>
                    </IconButton>

                    <IconButton onClick={this.props.setColor}
                                style={{width:25, height:25, float:'right', marginTop:10}}>
                        <i className="material-icons">
                            done
                        </i>
                    </IconButton>

            </div>
        )
    }

}

ColorSliders.propTypes = {

    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ColorSliders)
