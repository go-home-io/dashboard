import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearWaitingProgress from "./LinearWaitingProgress";
import {CONNECTION_TIMEOUT} from '../../settings/delays';

const styles = theme => ({
    timer: {
        width:'100%',
        marginTop:15,
    }
});

class IconLoading extends React.Component {
   render () {
       const {classes} = this.props;
       return (
           this.props.loading ?
               <div className={classes.timer}>
                     <LinearWaitingProgress time={CONNECTION_TIMEOUT}
                                            dev_id ={this.props.dev_id}
                     />
               </div>  : null
       )
   }
}

IconLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLoading);
