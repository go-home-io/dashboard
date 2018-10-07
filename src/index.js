import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import StartPage from "./components/pages/StartPage";
import "material-design-icons/iconfont/material-icons.css";
import "typeface-roboto/index.css";
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faLock, faBatteryThreeQuarters, faBatteryFull, faSpinner,
         faBatteryHalf, faBatteryQuarter, faBatteryEmpty, faCompass as farCompass,
       } from '@fortawesome/free-solid-svg-icons'

library.add(faThermometerHalf, faBatteryEmpty, faSpinner,
            faLock, faBatteryFull, faBatteryHalf, faBatteryQuarter,
            faBatteryThreeQuarters, farCompass );

// eslint-disable-next-line
ReactDOM.render(<StartPage/>, document.getElementById("root"));
registerServiceWorker();
