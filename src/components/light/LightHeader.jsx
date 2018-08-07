import React from 'react'
import Reflux from 'reflux'
import lightActions from "../../reflux/lightActions"
import Switch from '@material-ui/core/Switch';
// import LightStoreFactory from "./reflux/LightStore";
import Icon from "@material-ui/core/es/Icon/Icon";
import Typography from "@material-ui/core/es/Typography/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from 'prop-types'

const styles = theme => ({
    root: {
        cursor:'pointer',
        marginLeft: 10,
        marginTop:10,
        marginBottom:30,
    },
    icon: {
        float:'left'
    },
    typography: {
        float:'left',
        marginLeft:10,
    },
});


class LightHeader extends Reflux.Component {

     constructor(props) {
         super(props);
         this.handleClick = this.handleClick.bind(this);
     }

    handleClick () {
        lightActions.switch(this.props.location);
    }

    render () {
        // Styles
        const {classes} = this.props;
        const color = (this.props.switchOn) ? 'secondary' : 'primary';

        return (
                <div className={classes.root}
                     onClick={this.handleClick} >

                     <Icon color={color}
                           className={classes.icon} >
                         wb_sunny
                     </Icon>

                     <Typography variant="subheading"
                                 className={classes.typography} >

                        {this.props.location}
                     </Typography>

                </div>

        )
    }
}

LightHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightHeader)