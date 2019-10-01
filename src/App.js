import React from "react";
import "typeface-roboto";
import "material-design-icons/iconfont/material-icons.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faThermometerHalf,
    faLock,
    faBatteryThreeQuarters,
    faBatteryFull,
    faSpinner,
    faBatteryHalf,
    faBatteryQuarter,
    faBatteryEmpty,
    faCompass,
    faDoorClosed,
    faDoorOpen
} from "@fortawesome/free-solid-svg-icons";

import { ThemeProvider } from "@material-ui/styles";
import { customTheme } from "./settings/customTheme";
import AppContextProvider from "./context/AppContextProvider";
import EventEmitterProvider from "./context/EventEmitter";
import WebSocketComponent from "./websocket/WebSocketComponent";
import Notification from "./components/notification/Notification";
import LogsContextProvider from "./context/LogsContext";
import Start from "./components/pages/Start";

library.add(faThermometerHalf, faBatteryEmpty, faSpinner,
    faLock, faBatteryFull, faBatteryHalf, faBatteryQuarter,
    faBatteryThreeQuarters, faCompass, faDoorClosed,  faDoorOpen);

const App = () =>{
    return (
        // eslint-disable-next-line
        <ThemeProvider theme = { customTheme } >
            <AppContextProvider>
                <EventEmitterProvider>
                    <WebSocketComponent/>
                    <Notification/>
                    <LogsContextProvider>
                        <Start/>
                    </LogsContextProvider>
                </EventEmitterProvider>
            </AppContextProvider>
        </ThemeProvider>
    );
};

export default App;
