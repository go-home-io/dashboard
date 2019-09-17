import React, {useState} from "react";

export const LogsContext = React.createContext({
    filter: {},
    appliedFilters: {},
    setAppliedFilters: () => {},
    setFilter: () => {},
    reset: () => {}
});

const filterInitialValue = () => ({
    from_utc: Date.now() - 60*10*1000, // 10 minutes
    to_utc: Date.now(),
    log_level: "",
    system: "",
    provider: "",
    device_id: "",
    worker_id: "",
});

const LogsContextProvider = (props) => {

    const { children, ...other } = props;
    const [filter, setFilter] = useState(filterInitialValue());

    const [appliedFilters, setAppliedFilters] = useState(filterInitialValue());

    const logsState = {
        filter: filter,
        appliedFilters: appliedFilters,
        setAppliedFilters: setAppliedFilters,
        setFilter: (item, value) => setFilter({...filter, [item]: value}),
        previous: () => setFilter(appliedFilters),
        reset: () => setFilter(filterInitialValue())
    };
    // console.log("Log Context, filter", filter);
    // console.log("Log Context, applied", appliedFilters);
    return (
        <LogsContext.Provider value = { logsState } >
            <div { ...other }>
                { children }
            </div>
        </LogsContext.Provider>
    );
};

export default LogsContextProvider;