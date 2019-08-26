import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import AppStore from "../../reflux/application/AppStore";
import DevicePage from "./DevicePage";
import StatusStartPage from "./StatusStartPage";

class RouterPage extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            generalState: props.generalState,
        };
        this.store = AppStore;
    }

    render() {
        const { active_page: page, generalState  } = this.state;
        const displayDevices = page === "devices" ? "block" : "none";
        // const displayStatus = page === "status" ? "block" : "none";
        return (
            <>
                <div style = { {display: displayDevices} }>
                    <DevicePage
                        generalState = { generalState }
                    />
                </div>

                { page === "status" ? <StatusStartPage/> : null }
             </>
        );
    }
}

RouterPage.propTypes = {
    generalState: PropTypes.array.isRequired
};

export default RouterPage;