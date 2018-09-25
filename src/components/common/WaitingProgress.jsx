import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import {CONNECTION_TIMEOUT} from "../../settings/deviceDelays";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import WebSocketStore from "../../reflux/socket/WebSocketStore";
import wsActions from "../../reflux/socket/wsActions";

const PROGRESS_INCREMENT = 1;
const INTERVALS = 100 / PROGRESS_INCREMENT;

class WaitingProgress extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
        };
        this.store = WebSocketStore;
        this.timer = null;

        this.restart = this.restart.bind(this);
        this.progress = this.progress.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.restart = this.restart.bind(this);
        this.progress = this.progress.bind(this);
    }

    componentDidMount() {
        this.setState({ completed: 0 });
        this.timer = setInterval(this.progress, CONNECTION_TIMEOUT/INTERVALS);
    }

    componentWillUnmount () {
        this.setState({ completed: 0 });
    }

    onComplete (status) {
        const { dev_id, actions } = this.props;

        clearInterval(this.timer);
        this.timer = null;
        this.setState({ completed: 0 });
        actions.status(dev_id, status);
    }

    restart ()  {
        this.setState({ completed: 0 });
        setTimeout(setInterval(this.progress, CONNECTION_TIMEOUT/INTERVALS),200);
    }

    progress ()  {
        let { completed, reset, rejected} = this.state;

        if (rejected ) {
            this.onComplete("rejected");
        }
        if (reset) {
            clearInterval(this.timer);
            this.timer = null;
            wsActions.clear();
            this.restart();
        }
        if (completed === 100) {
            this.onComplete("error");
        } else {
            this.setState({ completed: completed + PROGRESS_INCREMENT });
        }
    }

    render () {
        return (
            <LinearProgress variant = "determinate" value = { this.state.completed } />
        );
    }
}

WaitingProgress.propTypes = {
    dev_id: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
};

export default (WaitingProgress);
