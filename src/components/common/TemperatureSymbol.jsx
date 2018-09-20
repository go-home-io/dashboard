import React from "react";
import Reflux from "reflux";
import AppStore from "../../reflux/application/AppStore";

class TemperatureSymbol extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AppStore;
    }

    render () {
        const { uom } = this.state;
        return (
            uom === "imperial"  ?
                <div style = { {display:"inline-block"} }>
                    &deg;F
                </div> :
                <div style = { {display:"inline-block"} }>
                    &deg;C
                </div>
        );
    }
}

export default TemperatureSymbol;