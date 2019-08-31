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
} from "@fortawesome/free-solid-svg-icons";

import StartPage from "./components/pages/StartPage";
import { ThemeProvider } from "@material-ui/styles";
import { customTheme } from "./settings/customTheme";
import AppContextProvider from "./context/AppContextProvider";

library.add(faThermometerHalf, faBatteryEmpty, faSpinner,
    faLock, faBatteryFull, faBatteryHalf, faBatteryQuarter,
    faBatteryThreeQuarters, faCompass );

const App = () =>{
    return (
        // eslint-disable-next-line
        <ThemeProvider theme = { customTheme } >
            <AppContextProvider>
                <StartPage/>
            </AppContextProvider>
        </ThemeProvider>
    );
};

export default App;
