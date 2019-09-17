import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import DevicePage from "./DevicePage";
import StatusStartPage from "./StatusStartPage";
import {customTheme} from "../../settings/customTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import storage from "../../services/storage";
import {AppContext} from "../../context/AppContextProvider";
import LogsPage from "../logs/LogsPage";

const RouterPage = props => {
    const { generalState } = props;
    let { active_page: page, setLocation, setPage, setUOM, setLogsAvailable } = useContext(AppContext);
    const displayDevices = page === "devices" ? "block" : "none";
    const { logs_available } = generalState;

    // Will affect only when Component did mount
    let active_location = storage.get("location");
    let active_page = storage.get("page");
    active_location = active_location ? active_location : "Default";
    active_page = active_page ? active_page : "devices";
    active_page = (! logs_available && active_page === "logs") ? "devices" : active_page;

    useEffect(() => {
        const { logs_available, uom } = generalState;
        setLocation(active_location);
        setPage(active_page);
        setUOM(uom);
        setLogsAvailable(logs_available);
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
                    logsAvailable = { logs_available }
                />
                }
            </div>

            { page === "status" && <StatusStartPage logsAvailable = { logs_available }/> }
            { page === "logs" && logs_available && <LogsPage logsAvailable = { logs_available }/> }

        </ThemeProvider>
    );
};

RouterPage.propTypes = {
    generalState: PropTypes.object.isRequired
};

export default RouterPage;