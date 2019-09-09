import React, {useState} from "react";

export const LogsContext = React.createContext({
    filter: {},
    setFilter: () => {},
});


const LogsContextProvider = (props) => {

    const { children, ...other } = props;
    const [filter, setFilter] = useState({
        FromUTC: Date.now() - 60*10*1000, // 10 minutes
        ToUTC: Date.now(),
        LogLevel: "",
        System: "",
        Provider: "",
        DeviceID: "",
        WorkerID: "",
    });


    const logsState = {
        filter: filter,
        setFilter: (item, value) => setFilter({...filter, [item]: value})
    };
    console.log("Log Context", filter);
    return (
        <LogsContext.Provider value = { logsState } >
            <div { ...other }>
                { children }
            </div>
        </LogsContext.Provider>
    );
};

export default LogsContextProvider;