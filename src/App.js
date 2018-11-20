import React from "react";
import "../src/index.css";
import "material-design-icons/iconfont/material-icons.css";
import "typeface-roboto/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThermometerHalf, faLock, faBatteryThreeQuarters, faBatteryFull, faSpinner,
    faBatteryHalf, faBatteryQuarter, faBatteryEmpty, faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import indexRoutes from "../src/routes/indexRoutes";
import { withCustomTheme } from "./components/withCustomTheme";

library.add(faThermometerHalf, faBatteryEmpty, faSpinner,
    faLock, faBatteryFull, faBatteryHalf, faBatteryQuarter,
    faBatteryThreeQuarters, faCompass );

const hist = createBrowserHistory();

class App extends React.Component {
    render() {
        return (
            // eslint-disable-next-line
            <Router history = { hist }>
                <Switch>
                    {indexRoutes.map((prop) => {
                        return (
                            <Route
                                exact path = { prop.path }
                                render = { () => withCustomTheme(prop.component) }
                                key = { prop.path }
                            />
                        );
                    })}
                </Switch>
            </Router>
        );
    }

}

export default (App);
