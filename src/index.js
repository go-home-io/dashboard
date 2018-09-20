import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import StartPage from "./components/pages/StartPage";

// eslint-disable-next-line
ReactDOM.render(<StartPage/>, document.getElementById("root"));
registerServiceWorker();
