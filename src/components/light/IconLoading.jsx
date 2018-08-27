import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {CONNECTION_TIMEOUT} from '../../settings/delays';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import lightActions from "../../reflux/lightActions";
import WebSocketStore from "../../reflux/WebSocketStore";
import wsActions from "../../reflux/wsActions";

const styles = theme => ({
    root: {
        width:'100%',
        marginTop:20,
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

    // componentWillUnmount() {
    //     clearInterval(this.timer);
    //     this.setState({ completed: 0 });
    // }

    onComplete (status) {
        clearInterval(this.timer);
        this.timer = null;
        this.setState({ completed: 0 });
        lightActions.status(this.props.dev_id, status);
    }

    restart = () => {
        this.timer = setInterval(this.progress, CONNECTION_TIMEOUT/20);
    };

    progress = () => {
        let { completed, reset, rejected } = this.state;
       // let {reset, rejected} = this.state;
        // let {rejected} = this.state;

        const diff = 5;

        if (rejected ) {
            // alert('rejected');
            this.onComplete('rejected');
        }

        if (reset) {
            clearInterval(this.timer);
            this.timer = null;
            this.setState({completed:0});
            completed = this.state.completed;
            wsActions.clear();
            setTimeout(this.restart.bind(this), 300);
        }

        if (completed === 100) {
            setTimeout(this.onComplete.bind(this), 230,'error' );
        } else {
            this.setState({ completed: completed + diff });
        }
    };

   render () {
       const {classes} = this.props;
       return (
                   <div className={classes.root}>
                       <LinearProgress variant="determinate" value={this.state.completed} />
                   </div>
       )
   }
}

IconLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLoading);
