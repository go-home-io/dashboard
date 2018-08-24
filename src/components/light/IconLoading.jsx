import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {CONNECTION_TIMEOUT} from '../../settings/delays';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import lightActions from "../../reflux/lightActions";
import WebSocketStore from "../../reflux/WebSocketStore";

const styles = theme => ({
    progress: {
        width:'100%',
        marginTop:15,
    }
});

class IconLoading extends Reflux.Component {
    timer = null;

    state = {
        completed: 0,
    };

    constructor(props) {
        super(props);
        this.store = WebSocketStore;
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, CONNECTION_TIMEOUT/20);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState({ completed: 0 });
    }

    onComplete (status) {
        clearInterval(this.timer);
        this.setState({ completed: 0 });

        lightActions.status(this.props.dev_id, status);
    }

    progress = () => {
        let { completed } = this.state;
        const diff = 5;

        if (this.state.rejected ) {
            // alert('Rejected');
            clearInterval(this.progress);
            this.onComplete('rejected');
        }

        if (completed === 100) {
            // setTimeout(this.onComplete.bind(this), 100);
            this.onComplete('error');
        } else {
            this.setState({ completed: completed + diff });
        }
    };

   render () {
       const {classes} = this.props;
       // this.timer = setInterval(this.progress, CONNECTION_TIMEOUT/50);
       return (
               this.props.loading ?
                   <div className={classes.progress}>
                       <LinearProgress variant="determinate" value={this.state.completed} />
                   </div>
           : null
       )
   }
}

IconLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLoading);
