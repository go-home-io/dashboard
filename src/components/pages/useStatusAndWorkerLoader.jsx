import { useEffect, useState} from "react";
import fetchHTTP from "../../services/httpservices";
import {STATUS_URL, WORKER_URL} from "../../settings/urls";

const useStatusAndWorkerLoader = () => {
    const [status, setStatus] = useState(null);
    const [worker, setWorker] = useState(null);

    // -------------- Load data for Status Page ---------------
    const getWorkers = () => {
        fetchHTTP.get(WORKER_URL)
            .then( data => {
                if ( typeof(data) !== "number" && Boolean(data) ) setWorker(data);
            });
    };

    const getStatus = () => {
        fetchHTTP.get(STATUS_URL)
            .then( data => {
                if ( typeof(data) !== "number" && Boolean(data) ) setStatus(data);
            });
    };

    useEffect(()=> {
        getWorkers();
        getStatus();
    },
    // eslint-disable-next-line
        []);

    return {
        status: status,
        worker: worker,
    };
};

export default useStatusAndWorkerLoader;