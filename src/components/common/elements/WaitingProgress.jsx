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
        // this.setState({ completed: 0 });
        this.timer = setInterval(this.progress, CONNECTION_TIMEOUT/INTERVALS);
        const { subscribe } = this.context;

        subscribe("rejected", this.onReject);
        subscribe("reset", this.onReset);
        subscribe("message", this.onMessage);
        // alert("On mount: "+this.props.dev_id);
    }
    componentWillUnmount () {
        this.setState({ completed: 0 });
        clearInterval(this.timer);
        this.timer = null;

        const { unsubscribe } = this.context;
        unsubscribe("rejected", this.onReject);
        unsubscribe("reset", this.onReset);
        unsubscribe("message", this.onMessage);
    }

    createNotificationBody = (dev_id, mess, status) => {
        const state = {
            created: Date.now(),
            message: mess,
            origin: dev_id,
            status: status,
        };
        return  { id: "notification", state: state };
    };


    // Listeners
    onMessage = (mess) => {
        const { dev_id } = this.props;
        if ( mess.id === dev_id ) this.finish("success");
    };

    onReject = (mess) => {
        const { dev_id } = this.props;
        if ( mess === dev_id ) this.finish("rejected");
    };

    onReset = (mess) => {
        const { dev_id } = this.props;
        if ( mess.id === dev_id ) this.restart();
    };

    // -----------------------------------------------------------------

    finish = (status) => {
        const { raiseEvent } = this.context;
        const { dev_id } = this.props;
        let message = "";
        let messStatus = "";

        clearInterval(this.timer);
        this.timer = null;

        if ( status === "success")  {
            raiseEvent("status", {id: dev_id, status: "success"});
        } else {
            setTimeout( () => {
                raiseEvent("status", {id: dev_id, status: "error"});
                switch (status) {
                case "rejected":
                    message = "Socket rejected the command due to connection problems";
                    messStatus = "error";
                    break;
                case "timeout":
                    message = "Server timeout, command may not be executed";
                    messStatus = "info";
                    break;
                default:
                }
                raiseEvent("message", this.createNotificationBody(dev_id, message, messStatus));
            }, 365);
        }

        setTimeout(()=>{
            raiseEvent("loading", {id: dev_id, loading: false});
        }, 385);


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
        const { completed } = this.state;

        return (
            <LinearProgress variant = "determinate" value = { completed } />
        );
    }
}

WaitingProgress.propTypes = {
    dev_id: PropTypes.string.isRequired,
};

export default (WaitingProgress);
