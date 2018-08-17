import React from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/es/styles/withStyles";
import RGBSlider from "./RGBSlider";
import IconButton from "@material-ui/core/IconButton/IconButton";

const styles = theme => ({
    root : {
        marginTop:0,
        width:'100%',
        cursor: 'default',
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
        // let state = this.state;
        // state.r = this.props.color.r;
        // state.g = this.props.color.g;
        // state.b = this.props.color.b;
        // console.log(state);
        // this.setState({state});
        this.props.close();
    }

    render () {
        const {classes} = this.props;

        // const close = this.props.close;


        return (
            <Grid container className={classes.root}>

                {RGBSlider(this.state.r, '#f50057','#e46363', this.handleChangeRed.bind(this))}
                {RGBSlider(this.state.g, 'green','lightgreen', this.handleChangeGreen.bind(this))}
                {RGBSlider(this.state.b, 'blue','lightblue', this.handleChangeBlue.bind(this))}
                <Grid item sm={2}>
                    <IconButton onClick={this.onCloseClick.bind(this)}
                                style={{width:25, height:25}}>
                        <i className="material-icons">
                            clear
                        </i>
                    </IconButton>
                </Grid>
                <Grid item sm={8}>
                </Grid>
                <Grid item sm={2}>
                    <IconButton onClick={this.props.setColor}
                                style={{width:25, height:25}}>
                        <i className="material-icons">
                            done
                        </i>
                    </IconButton>
                </Grid>
            </Grid>
        )
    }

}

ColorSliders.propTypes = {

    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ColorSliders)
