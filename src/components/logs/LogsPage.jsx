import React, {useContext, useEffect, useState} from "react";
import Layout from "../pages/Layout";
import fetchHTTP from "../../services/httpservices";
import {LOGS_URL} from "../../settings/urls";
import {EventEmitter} from "../../context/EventEmitter";
import LogsManager from "./LogsManager";
import {LogsContext} from "../../context/LogsContext";

const LogsPage = (props) => {
    const [logs, setLogs] = useState([]);
    const { raiseEvent, subscribe, unsubscribe } = useContext(EventEmitter);
    const { filter, appliedFilters, setAppliedFilters } = useContext(LogsContext);
    // const [appliedFilters, setAppliedFilters] = useState({});

    // ---------------------Data Loader ---------------------------------

    const getLogs = (filters) => {
        fetchHTTP.post(LOGS_URL, filters)
            .then((data) => {
                setAppliedFilters(filters);
                if ( data ) setLogs(data);
                else raiseEvent("notification", {
                    created: Date.now(),
                    message: "Can't load logs, HTML error:" + data.status,
                    origin: "LOGS_LOADER",
                    status: "error",
                });
            });
    };

    const onApply = (filters) => getLogs(filters);

    useEffect( () => {
        getLogs(filter);
        subscribe("apply", onApply);

        return () => unsubscribe("apply", onApply);
    },
    // eslint-disable-next-line
        [] );


    return (
        <Layout { ...props }>
            { logs &&
                <LogsManager logs = { logs } appliedFilters = { appliedFilters }/>
            }
        </Layout>
    );
};

export default LogsPage;