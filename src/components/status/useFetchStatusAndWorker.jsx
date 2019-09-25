import { useEffect, useState} from "react";
import fetchHTTP from "../../services/httpservices";
import {STATUS_URL, WORKER_URL} from "../../settings/urls";

const useFetchStatusAndWorker = () => {
    const [state, setState] = useState(
        {
            worker: null,
            status: null
        });

    const fetchData = (item, url) => {
        fetchHTTP.get(url)
            .then( data => {
                if ( typeof(data) !== "number" && Boolean(data) )
                    setState( prevState => ({
                        ...prevState,
                        [item]: data
                    }));
            });
    };
    useEffect(()=> {
        fetchData("worker", WORKER_URL);
        fetchData("status", STATUS_URL);
    },
    // eslint-disable-next-line
        []);
    return state;
};

export default useFetchStatusAndWorker;