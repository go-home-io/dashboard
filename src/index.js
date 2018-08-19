import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import StartPage from "./views/StartPage";


ReactDOM.render(<StartPage/>, document.getElementById('root'));
registerServiceWorker();
