import React from 'react'
import Reflux from 'reflux'
import AppStore from "../../reflux/application/AppStore";

class TemperatureSymbol extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
    }

    render () {
        const temperatureSymbol = (this.state.uom === "imperial" ) ? '&#8457;' : '&#8451;';

        return <div  style={{display:'inline-block'}}
                     dangerouslySetInnerHTML={{__html: temperatureSymbol}}
               />
    }
}

export default TemperatureSymbol