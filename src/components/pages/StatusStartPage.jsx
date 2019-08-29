import React from "react";
import Reflux from "reflux";
import HTTP from "../../services/httpservices";
import { STATUS_URL, WORKER_URL} from "../../settings/urls";
import ErrorPage from "./ErrorPage";
import StatusPagejsx from "./StatusPage";
import appActions from "../../reflux/application/appActions";
import storage from "../../services/storage";

class StatusStartPage extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: [],
            worker: [],
            IO_status: 404,
            loading: true,
        };
        this.getStatusAndWorkers = this.getStatusAndWorkers.bind(this);
    }
    componentDidMount () {
        this.getStatusAndWorkers();
    }
    getStatusAndWorkers() {
        // Get Workers
        HTTP.get(WORKER_URL)
            .then( response => {
                if ( typeof(response) === "number" ) {
                    this.setState({
                        IO_status: response,
                        loading: false
                    });
                } else {
                    this.setState({
                        worker: response,
                        IO_status: 200,
                    });
                    appActions.workerSuccessfullyLoaded();
                }
            });
        // Get Status
        HTTP.get(STATUS_URL)
            .then( response => {
                if ( typeof(response) === "number" ) {
                    this.setState({
                        IO_status: response,
                        loading: false
                    });
                } else {
                    this.setState({
                        status: response,
                        IO_status: 200,
                        loading: false
                    });
                }
            });
    }
    render () {
        const { loading, IO_status, status, worker} = this.state;
        const success = IO_status === 200;
        const accessDenied = IO_status === 403;
        storage.set("page", "status");

        return (
            loading ?
                <ErrorPage loading = { true }/> :
                success || accessDenied ?
                    <StatusPagejsx
                        status = { status }
                        worker = { worker }
                        access = { ! accessDenied }
                    /> :
                    <ErrorPage
                        loading = { false }
                        status = { IO_status }
                    />
        );
    }
}

export default (StatusStartPage);