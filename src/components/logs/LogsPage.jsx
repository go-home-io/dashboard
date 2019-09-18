import React, {useContext, useEffect, useState} from "react";
import Layout from "../pages/Layout";
import fetchHTTP from "../../services/httpservices";
import {LOGS_URL} from "../../settings/urls";
import {EventEmitter} from "../../context/EventEmitter";
import LogsManager from "./LogsManager";
import {LogsContext} from "../../context/LogsContext";
import ErrorPage from "../pages/ErrorPage";

const LogsPage = (props) => {
    const [logs, setLogs] = useState([]);
    const { raiseEvent, subscribe, unsubscribe } = useContext(EventEmitter);
    const { filter, appliedFilters, setAppliedFilters } = useContext(LogsContext);
    const [loading, setLoading] = useState(false);

    // ---------------------Data Loader ---------------------------------

    const getLogs = (filters) => {
        fetchHTTP.post(LOGS_URL, filters)
            .then((data) => {
                if ( typeof(data) === "number" || ! data) {
                    raiseEvent("notification", {
                        created: Date.now(),
                        message: "Can't load logs, HTML error: " + data,
                        origin: "LOGS_LOADER",
                        status: "error",
                    });
                } else {
                    setLogs(data);
                    setAppliedFilters(filters);
                    setLoading(false);
                }
            });
    };

    const onApply = (filters) => {
        setLoading(true);
        getLogs(filters);
    };

    useEffect( () => {
        subscribe("apply", onApply);

        setLoading(true);
        getLogs(filter);

        return () => unsubscribe("apply", onApply);
    },
    // eslint-disable-next-line
        [] );

    return (
        loading ?
            <ErrorPage loading = { true }/>
            :
            <Layout { ...props }>
                { logs &&
                <LogsManager logs = { logs } appliedFilters = { appliedFilters }/>
                }
            </Layout>
    );
};

export default LogsPage;