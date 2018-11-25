import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "typeface-roboto";
import App from "./App";

// eslint-disable-next-line
ReactDOM.render(<App/>, document.getElementById("root"));

registerServiceWorker();
