import React, {useContext} from "react";
import PropTypes from "prop-types";
import useFetchStatusAndWorker from "../status/useFetchStatusAndWorker";
import RouterFunc from "./RouterFunc";
import {AppContext} from "../../context/AppContextProvider";

const StatusLoader = (props) => {
    const {status, worker} = useFetchStatusAndWorker();
    const {generalState} = props;
    const { setStatusPageAvailable } = useContext(AppContext);

    setStatusPageAvailable( Boolean(status) || Boolean(worker) );

    return <RouterFunc generalState = { generalState } status = { status } worker = { worker }/>;
};

StatusLoader.propTypes = {
    generalState: PropTypes.array.isRequired
};

export default StatusLoader;