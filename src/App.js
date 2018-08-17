import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from "./views/HomePage";


class App extends Component {
  render() {
    return (
        function MyApp() {
            return (
                <React.Fragment>
                    <CssBaseline />
                    <HomePage/>
                </React.Fragment>
            );
        }
    );
  }
}

export default App;
