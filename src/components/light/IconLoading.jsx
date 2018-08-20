import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const iconSize = [22, 35, 57];

const styles = theme => ({
    progress: {
        height: 50,
        widths: 50,

    },
});

class IconLoading extends React.Component {

   render () {
       const {classes} = this.props;
       const size = iconSize[this.props.rows-1];
       return (
           this.props.loading ?
            <CircularProgress className={classes.progress} size={size}/>
             : null
       )
   }
}

IconLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLoading);
