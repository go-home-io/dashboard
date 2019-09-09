import React, {useContext, useEffect, useState} from "react";
// import PropTypes from "prop-types";
import Layout from "../pages/Layout";
import fetchHTTP from "../../services/httpservices";
import {LOGS_URL} from "../../settings/urls";
import {EventEmitter} from "../../context/EventEmitter";
import LogsManager from "./LogsManager";
import {LogsContext} from "../../context/LogsContext";


const LogsPage = (props) => {
    // ------------------------------------------------------
    const [logs, setLogs] = useState([]);
    const { filter } = useContext(LogsContext);
    const { raiseEvent } = useContext(EventEmitter);

    const getLogs = () => {
        fetchHTTP.post(LOGS_URL, filter)
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

    const apply = () => getLogs();

    useEffect( () => getLogs(),
        // eslint-disable-next-line
        [] );

    return (
        <Layout { ...props }>
            { logs &&
            <LogsManager
                logs = { logs }
                apply = { apply }
                appliedFilters = { filter }
            /> }
        </Layout>
    );
};

export default LogsPage;