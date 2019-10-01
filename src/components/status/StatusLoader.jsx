import React, {useContext} from "react";
import PropTypes from "prop-types";
import useFetchStatusAndWorker from "./useFetchStatusAndWorker";
import RouterFunc from "../pages/RouterFunc";
import {AppContext} from "../../context/AppContextProvider";

const StatusLoader = (props) => {
    const {status, worker} = useFetchStatusAndWorker();
    const {generalState} = props;
    const { setStatusPageAvailable } = useContext(AppContext);

    setStatusPageAvailable( Boolean(status) || Boolean(worker) );

    return <RouterFunc generalState = { generalState } status = { status } worker = { worker }/>;
};

StatusLoader.propTypes = {
    generalState: PropTypes.object.isRequired
};

export default StatusLoader;