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
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch } from "react-router-dom";
// import indexRoutes from "../src/routes/indexRoutes";
// import { customTheme } from "./settings/customTheme";
import StartPage from "./components/pages/StartPage";
import { ThemeProvider } from "@material-ui/styles";
import {customTheme} from "./settings/customTheme";

library.add(faThermometerHalf, faBatteryEmpty, faSpinner,
    faLock, faBatteryFull, faBatteryHalf, faBatteryQuarter,
    faBatteryThreeQuarters, faCompass );

// const hist = createBrowserHistory();

class App extends React.Component {
    render() {
        return (
            // eslint-disable-next-line
            <ThemeProvider theme = { customTheme } >
                <StartPage/>
            </ThemeProvider>
            // {/*<Router history = { hist }>*/}
            // {/*    <Switch>*/}
            // {/*        {indexRoutes.map((prop) => {*/}
            // {/*            const { path, component } = prop;*/}
            // {/*            return (*/}
            // {/*                <Route*/}
            // {/*                    exact path = { path }*/}
            // {/*                    component = { component }*/}
            // {/*                    key = { path }*/}
            // {/*                />*/}
            // {/*            );*/}
            // {/*        })}*/}
            // {/*    </Switch>*/}
            // {/*</Router>*/}

        );
    }
}

export default App;
