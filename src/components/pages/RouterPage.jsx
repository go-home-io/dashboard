import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import DevicePage from "./DevicePage";
import StatusStartPage from "./StatusStartPage";
import {customTheme} from "../../settings/customTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import storage from "../../services/storage";
import {AppContext} from "../../context/AppContextProvider";

const RouterPage = props => {
    const { generalState } = props;
    let { active_page: page, setLocation, setPage, setUOM } = useContext(AppContext);
    const displayDevices = page === "devices" ? "block" : "none";

    // Will affect only when Component did mount
    let active_location = storage.get("location");
    let active_page = storage.get("page");
    active_location = active_location ? active_location : "Default";
    active_page = active_page ? active_page : "devices";

    useEffect(() => {
        setLocation(active_location);
        setPage(active_page);
        setUOM(generalState.uom);
    },
    // eslint-disable-next-line
   []);

    return (

        <ThemeProvider theme = { customTheme }>

            <div style = { {display: displayDevices} }>
                { generalState &&
                <DevicePage
                    generalState = { generalState }
                    pageVisible = { page === "devices" }
                />
                }
            </div>

            { page === "status" && <StatusStartPage/> }

        </ThemeProvider>
    );
};

RouterPage.propTypes = {
    generalState: PropTypes.object.isRequired
};

// RouterPage.contextType = AppContext;

export default RouterPage;