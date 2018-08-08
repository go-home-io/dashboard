import React, {Component} from 'react'
import PropTypes from 'prop-types'
import presetColors from './presetColors'
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
   box:{
            width:12,
            height:12,
            display:'inline-block',
            marginLeft: 7,
            border:'solid 1px #000' }
});

class ColorBox extends Component {

   render () {
        const {classes} = this.props;
        const bkgColor = presetColors[this.props.color];

        return (
            <div  className={classes.box}
                  style={{backgroundColor:bkgColor}}>
                  &nbsp;
            </div>

        )
    }
}

ColorBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ColorBox)