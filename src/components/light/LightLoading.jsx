import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    progress: {
        height: 20,
    },
});

class LightLoading extends React.Component {

   render () {
       const {classes} = this.props;

       return (
           this.props.loading ?
               <Grid
                   container
                   justify={'center'}
                   alignItems={'center'}>

                   <CircularProgress className={classes.progress} size={58}/>

               </Grid>
             : null
       )
   }
}

LightLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightLoading);
