import React, {useEffect, useState} from "react";
import ErrorPage from "./ErrorPage";
import AppBarPlaceholder from "../navigation/AppBarPlaceholder";
import SignIn from "./SignIn";
import base64 from "base-64";
import Cookie from "js-cookie";
import {COOKIE_NAME} from "../../settings/cookie";
import fetchHTTP from "../../services/httpservices";
import {STATE_URL} from "../../settings/urls";
import StatusLoader from "./StatusLoader";

const Start = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [authRequierd, setAuthRequierd] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);

    const getDataByHTTP = (url) => {
        // const vlad_url = "https://home.v-home.duckdns.org/api/v1/state";
        setLoading(true);
        fetchHTTP.get(url)
            .then((data) => {
                if (typeof(data) === "number" || !data) {
                    // Error
                    setErrorStatus(data);
                    if (data === 401 || data === 403) setAuthRequierd(true);
                } else {
                    // Success
                    setData(data);
                }
            })
            .then(()=>setLoading(false));
    };

    const getCredentials = (user, password) => {
        const credentials = "Basic " + base64.encode(user + ":" + password);
        Cookie.set(COOKIE_NAME, credentials);
        setAuthRequierd(false);
        setAuthError(true);
        getDataByHTTP(STATE_URL);
    };

    useEffect( () => {
        getDataByHTTP(STATE_URL);
    },
    []);

    // ------------------- render ----------------------------

    if ( loading ) return <ErrorPage loading = { loading }/>;

    else if ( data )
        return <StatusLoader generalState = { data } />;

    else if (authRequierd) {
        Cookie.remove(COOKIE_NAME);
        return (
            <>
                <AppBarPlaceholder/>
                <SignIn
                    getCredentials = { getCredentials }
                    error = { authError }
                />
            </>
        );
    }

    else return <ErrorPage status = { errorStatus }/>;
};

export default Start;