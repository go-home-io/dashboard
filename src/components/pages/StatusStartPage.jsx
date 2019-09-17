import React from "react";
import fetchHTTP from "../../services/httpservices";
import { STATUS_URL, WORKER_URL} from "../../settings/urls";
import ErrorPage from "./ErrorPage";
import StatusPage from "./StatusPage";
import storage from "../../services/storage";

class StatusStartPage extends React.Component {
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
        fetchHTTP.get(WORKER_URL)
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
                }
            });
        // Get Status
        fetchHTTP.get(STATUS_URL)
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
        const { ...other } = this.props;
        const { loading, IO_status, status, worker } = this.state;
        const success = IO_status === 200;
        const accessDenied = IO_status === 403;
        storage.set("page", "status");

        return (
            loading ?
                <ErrorPage loading = { true }/> :
                success || accessDenied ?
                    <StatusPage
                        status = { status }
                        worker = { worker }
                        access = { ! accessDenied }
                        { ...other }
                    /> :
                    <ErrorPage
                        loading = { false }
                        status = { IO_status }
                    />
        );
    }
}

export default (StatusStartPage);