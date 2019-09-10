import React, {useContext, useEffect, useState} from "react";
import Layout from "../pages/Layout";
import fetchHTTP from "../../services/httpservices";
import {LOGS_URL} from "../../settings/urls";
import {EventEmitter} from "../../context/EventEmitter";
import LogsManager from "./LogsManager";

const LogsPage = (props) => {
    const [logs, setLogs] = useState([]);
    const { raiseEvent, subscribe, unsubscribe } = useContext(EventEmitter);

    // ---------------------Data Loader ---------------------------------

    const getLogs = (filters) => {
        fetchHTTP.post(LOGS_URL, filters)
            .then((data) => {
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
        getLogs();
        subscribe("apply", onApply);

        return () => unsubscribe("apply", onApply);
    },
    // eslint-disable-next-line
        [] );


    return (
        <Layout { ...props }>
            { logs &&
                <LogsManager logs = { logs }/>
            }
        </Layout>
    );
};

export default LogsPage;