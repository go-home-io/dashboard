import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';
import LinearWaitingProgress from "./LinearWaitingProgress";

// const margins = [8, 35, 57];

const styles = theme => ({
    timer: {
        width:'100%',
        marginTop:15,
        // height: ,
    }
});

class IconLoading extends React.Component {

   render () {
       const {classes} = this.props;
       return (
           this.props.loading ?
               <div className={classes.timer}>
                     <LinearWaitingProgress time={3000}
                                            dev_id ={this.props.dev_id} />
               </div>  : null
       )
   }
}

IconLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLoading);
