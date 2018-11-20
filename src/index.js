import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "../src/index.css";
import "material-design-icons/iconfont/material-icons.css";
import "typeface-roboto/index.css";
import App from "./App";

// eslint-disable-next-line
ReactDOM.render(<App/>, document.getElementById("root"));

registerServiceWorker();
