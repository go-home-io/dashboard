import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import StartPage from "./components/pages/StartPage";


ReactDOM.render(<StartPage/>, document.getElementById('root'));
registerServiceWorker();
