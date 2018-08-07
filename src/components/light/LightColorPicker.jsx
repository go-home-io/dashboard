import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/es/styles/withStyles";
import BigColorBox from './ColorBox'
import presetColors from './presetColors'
import Typography from "@material-ui/core/Typography/Typography";
import PresetColorsSelect from "./PresetColorsSelect";

const style = theme => ({
    root : {
        marginTop:10,
    },
});


class LightColorPicker extends Component {

    render () {
        const classes = this.props;

        return (
                <div className={classes.root}>
                    <Typography variant={'body1'}>
                        Color:<BigColorBox color={this.props.selectedColor}/>
                    </Typography>
                    <PresetColorsSelect
                           presetColors = {presetColors}
                           location = {this.props.location} />

                </div>



        )
    }
}

LightColorPicker.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(LightColorPicker)

