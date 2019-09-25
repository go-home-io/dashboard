import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import DevicePage from "./DevicePage";
import {customTheme} from "../../settings/customTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import storage from "../../services/storage";
import {AppContext} from "../../context/AppContextProvider";
import LogsPage from "../logs/LogsPage";
import StatusManager from "../status/StatusManager";
import Layout from "./Layout";
import useFetchStatusAndWorker from "../status/useFetchStatusAndWorker";

const RouterPage = props => {
    const { generalState } = props;
    const { status, worker } = useFetchStatusAndWorker();
    let { active_page: page, setLocation, setPage, setUOM,
        setLogsAvailable, setStatusPageAvailable } = useContext(AppContext);
    const { logs_available } = generalState;

    const displayDevices = () => ( page === "devices" ? "block" : "none" );

    const isStatusPageAvailable = () =>  ( Boolean(worker) || Boolean(status) );


    // -----   Set active_page, active_location and uom to AppContext when Component did mount -------
    let active_location = storage.get("location") ? storage.get("location") : "Default";
    let active_page = storage.get("page") ? storage.get("page") : "devices";
    // active_page =  ( ! statusPageAvailable && active_page === "status") ? "devices" : active_page;


    useEffect(() => {
        const { logs_available, uom } = generalState;
        setLocation(active_location);
        setPage(active_page);
        setUOM(uom);
        setLogsAvailable(logs_available);
    },
    // eslint-disable-next-line
   []);

    useEffect( () =>  setStatusPageAvailable( isStatusPageAvailable() ),
        // eslint-disable-next-line
        [status, worker]);

    return (
        <ThemeProvider theme = { customTheme }>

            <div style = { {display: displayDevices()} }>
                { generalState &&
                    <DevicePage
                        generalState = { generalState }
                        pageVisible = { page === "devices" }
                    />
                }
            </div>

            { page === "status" &&
                <Layout>
                    { isStatusPageAvailable() &&
                        <StatusManager
                            status = { status }
                            worker = { worker }
                        />
                    }
                </Layout>
            }

            { page === "logs" &&
              ( logs_available ? <LogsPage/> : setPage("devices")  )
            }

        </ThemeProvider>
    );
};

RouterPage.propTypes = {
    generalState: PropTypes.object.isRequired
};

export default RouterPage;