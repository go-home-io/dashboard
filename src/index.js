import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import HomePage from "./views/HomePage";


ReactDOM.render(<HomePage/>, document.getElementById('root'));
registerServiceWorker();
