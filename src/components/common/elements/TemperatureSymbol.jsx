import React, {useContext} from "react";
import {AppContext} from "../../../context/AppContextProvider";

const TemperatureSymbol = () => {
    const { uom } = useContext(AppContext);
    return (
        uom === "imperial"  ?
            <div style = { {display:"inline-block"} }>
                &deg;F
            </div> :
            <div style = { {display:"inline-block"} }>
                &deg;C
            </div>
    );
};

export default TemperatureSymbol;