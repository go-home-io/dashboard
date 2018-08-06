import React, {Component} from 'react'
import PropTypes from 'prop-types'
import colors from './colors'
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
   box:{
            width:12,
            height:12,
            display:'inline-block',
            marginLeft: 7,
            border:'solid 1px #000' }
});

class BigColorBox extends Component {

   render () {
        const {classes} = this.props;
        const bkgColor = colors[this.props.color];

        return (
            <div  className={classes.box}
                  style={{backgroundColor:bkgColor}}
              >
            </div>
        )
    }
}

BigColorBox.PropTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BigColorBox)