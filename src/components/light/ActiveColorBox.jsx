import React from 'react'
import Reflux from 'reflux'
import lightActions from '../../reflux/lightActions'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    smallbox: {
        width: 8,
        height: 8,
        display: 'inline-block',
        marginTop: 5,
        margin:'5px 10px 0 0',
        cursor:'pointer',
        border:'solid 1px #000',
        float:'left',

    },
    border: {
        height: 2,
        width: 10,
        marginTop: 2,
        backgroundColor: 'blue',
    }
});

class ActiveColorBox extends Reflux.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        lightActions.setColor(this.props.location, this.props.color);
    }


    render () {

        const {classes} = this.props;
        return (

                <div  style={{backgroundColor:this.props.colorName}}
                      onClick={this.handleClick}
                      className={classes.smallbox}>

                </div>

        )
    }
 }

 ActiveColorBox.propTypes = {
    classes: PropTypes.object.isRequired
 };

 export default withStyles(styles)(ActiveColorBox)