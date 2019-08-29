import React from "react";

export const AppContext = React.createContext({
    active_location: "TestPage",
    active_group: null,
    active_page: "devices",
    setContextState: () => {},
    getDeviceInfo: () => {}
});