import React, {useContext, useEffect, useState} from "react";
import fetchHTTP from "../../services/httpservices";
import {LOGS_URL} from "../../settings/urls";
import {EventEmitter} from "../../context/EventEmitter";
import LogsManager from "../logs/LogsManager";
import {LogsContext} from "../../context/LogsContext";
import ErrorPage from "./ErrorPage";

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const { raiseEvent, subscribe, unsubscribe } = useContext(EventEmitter);
    const { filter, appliedFilters, setAppliedFilters } = useContext(LogsContext);
    const [loading, setLoading] = useState(false);

    // --------------------------------------------------------------------

    const raiseNoti = () =>  {
        const state = {
            created: Date.now(),
            message: "Can't load the logs due to connection problems",
            origin: "LOGS LOADER",
            status: "error",
        };
        const data = { id: "notification", state: state };
        raiseEvent("message", data);
    };

    const getLogs = (filters) => {
        setLoading(true);
        fetchHTTP.post(LOGS_URL, filters)
            .then((data) => {
                if ( typeof(data) === "number" || ! data) {
                    setLogs([{}]);
                    raiseNoti();
                } else {
                    setLogs(data);
                    setAppliedFilters(filters);
                }
                setLoading(false);
            });
    };

    const onApply = (filters) => {
        getLogs(filters);
    };

    useEffect( () => {
        subscribe("apply", onApply);
        getLogs(filter);
        return () => unsubscribe("apply", onApply);
    }, [] );

    if (loading )
        return <ErrorPage loading = { true }/>;
    else
        return <LogsManager logs = { logs } appliedFilters = { appliedFilters }/>;

};

export default LogsPage;