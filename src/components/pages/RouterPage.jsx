import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import AppStore from "../../reflux/application/AppStore";
import DevicePage from "./DevicePage";
import StatusStartPage from "./StatusStartPage";
import {customTheme} from "../../settings/customTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import storage from "../../services/storage";
import appActions from "../../reflux/application/appActions";
import { AppContext } from "../../context/AppContextProvider";


class RouterPage extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            generalState: props.generalState,
        };
        this.store = AppStore;
    }
    componentDidMount () {
        // Restore active location and active page from local storage
        let active_location = storage.get("location");
        let active_page = storage.get("page");
        active_location = active_location ? active_location : "Default";
        active_page = active_page ? active_page : "devices";
        appActions.setLocation(active_location);
        appActions.setActivePage(active_page);

        let value = this.context;
        const { generalState } = this.props;
        value.setStoreState(generalState);
    }
    render() {
        const { active_page: page, generalState  } = this.state;
        const displayDevices = page === "devices" ? "block" : "none";
        let value = this.context;


        console.log(value);

        return (

            <ThemeProvider theme = { customTheme }>

                <div style = { {display: displayDevices} }>
                    { generalState &&
                    <DevicePage generalState = { generalState } pageVisible = { page === "devices" }/>
                    }
                </div>

                { page === "status" && <StatusStartPage/> }

            </ThemeProvider>
        );
    }
}

RouterPage.propTypes = {
    generalState: PropTypes.object.isRequired
};

RouterPage.contextType = AppContext;

export default RouterPage;