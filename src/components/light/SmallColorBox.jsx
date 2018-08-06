import React from 'react'
import Reflux from 'reflux'
import lightActions from '../../reflux/lightActions'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/es/styles/withStyles";

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
        // borderBottom:'solid 4px #999'
    },
    border: {
        height: 2,
        width: 10,
        marginTop: 2,
        backgroundColor: 'blue',
    }
});

class SmallColorBox extends Reflux.Component {
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

                <div   onClick={this.handleClick}
                       className={classes.smallbox}
                       style={{backgroundColor:this.props.colorName}}>

                </div>

        )
    }
 }

 SmallColorBox.PropTypes = {
    classes: PropTypes.object.isRequired
 };

 export default withStyles(styles)(SmallColorBox)