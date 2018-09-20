import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {CONNECTION_TIMEOUT} from "../../settings/deviceDelays";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import lightActions from "../../reflux/light/lightActions";
import WebSocketStore from "../../reflux/socket/WebSocketStore";
import wsActions from "../../reflux/socket/wsActions";

const styles = () => ({
    root: {
        width:"100%",
        marginTop:25,
        marginRight: 12,
    }
});

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
        this.timer = setInterval(this.progress, CONNECTION_TIMEOUT/100);
    }

    componentWillUnmount () {
        this.setState({ completed: 0 });
    }

    onComplete (status) {
        clearInterval(this.timer);
        this.timer = null;
        this.setState({ completed: 0 });
        lightActions.status(this.props.dev_id, status);
    }

    restart ()  {
        this.setState({ completed: 0 });
        setTimeout(setInterval(this.progress, CONNECTION_TIMEOUT/100),300);
        // setInterval(this.progress, CONNECTION_TIMEOUT/100);
    }

    progress ()  {
        let { completed, reset, rejected} = this.state;
        const diff = 1;

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
            this.setState({ completed: completed + diff });
        }
    }

    render () {
        const {classes} = this.props;
        return (
            <div className = { classes.root }>
                <LinearProgress variant = "determinate" value = { this.state.completed } />
            </div>
        );
    }
}

WaitingProgress.propTypes = {
    classes: PropTypes.object.isRequired,
    dev_id: PropTypes.string.isRequired
};

export default withStyles(styles)(WaitingProgress);
