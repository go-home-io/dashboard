import React from "react";
import PropTypes from "prop-types";
import { CONNECTION_TIMEOUT } from "../../../settings/deviceDelays";
import LinearProgress from "@material-ui/core/LinearProgress";
import {EventEmitter} from "../../../context/EventEmitter";

const PROGRESS_INCREMENT = 1;
const INTERVALS = 100 / PROGRESS_INCREMENT;

class WaitingProgress extends React.Component {
    static contextType = EventEmitter;
    state = { completed: 0};
    componentDidMount() {
        this.setState({ completed: 0 });
        this.timer = setInterval(this.progress, CONNECTION_TIMEOUT/INTERVALS);
        // alert("On mount: "+this.props.dev_id);
    }
    componentWillUnmount () {
        this.setState({ completed: 0 });
        clearInterval(this.timer);
        this.timer = null;
    }

    // Listeners
    onMessage = (mess) => {
        const { dev_id } = this.props;
        if ( mess.id === dev_id ) this.finish("success");
    };

    onReject = (mess) => {
        const { dev_id } = this.props;
        if ( mess.id === dev_id ) this.finish("rejected");
    };

    onReset = (mess) => {
        const { dev_id } = this.props;
        if ( mess.id === dev_id ) this.restart();
    };

    // -----------------------------------------------------------------

    finish = (status) => {
        const { raiseEvent } = this.context;
        const { dev_id } = this.props;


        clearInterval(this.timer);
        this.timer = null;
        if ( status === "success")  {
            raiseEvent("status", {id: dev_id, status: "success"});
        }
        setTimeout(()=>{
            raiseEvent("loading", {id: dev_id, loading: false});
            if ( status !== "success")  {
                raiseEvent("status", {id: dev_id, status: "error"});
                raiseEvent("ws_error", {id: dev_id, status: status});
            }
        }, 400);
        // this.setState({completed: 0});
    };


    restart = () => {
        this.setState({completed:0});
        setTimeout(()=>setInterval(this.progress, CONNECTION_TIMEOUT/INTERVALS),100);
    };

    progress = () => {
        const { completed } = this.state;
        if (completed === 100) {
            this.finish("timeout");
        } else {
            const newValue = completed + PROGRESS_INCREMENT;
            this.setState( {completed: newValue} );
        }
    };

    render() {
        const { subscribe } = this.context;
        const { completed } = this.state;

        subscribe("rejected", this.onReject);
        subscribe("reset", this.onReset);
        subscribe("message", this.onMessage);

        return (
            <LinearProgress variant = "determinate" value = { completed } />
        );
    }
}

// WaitingProgress.contextType = EventEmitter;

WaitingProgress.propTypes = {
    dev_id: PropTypes.string.isRequired,
};

export default (WaitingProgress);
