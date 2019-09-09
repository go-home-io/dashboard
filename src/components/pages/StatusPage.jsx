import React from "react";
import StatusManager from "../status/StatusManager";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import Layout from "./Layout";

const StatusPage = props => {
    const { access, status, worker} = props;

    return (
        <Layout>
            { access ?
                <StatusManager
                    status = { status }
                    worker = { worker }
                /> :
                <Typography
                    style = { { marginTop: 100 } }
                    variant = "display4"
                    align = "center"
                >
                    Access Denied
                </Typography>
            }
        </Layout>
    );
};

StatusPage.propTypes = {
    access: PropTypes.bool.isRequired,
    status: PropTypes.array.isRequired,
    worker: PropTypes.array.isRequired
};

export default StatusPage;