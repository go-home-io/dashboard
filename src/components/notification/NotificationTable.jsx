import React from "react";
import PropTypes from "prop-types";
import NotificationTableLine from "./NotificationTableLine";

const  NotificationTable = props => {

    const { show_all, ntfList } = props;

    // Sort notification list descending
    if (ntfList) {
        ntfList.sort( (a,b) => { return (b.created - a.created); });
    }

    return (
        ntfList &&
            <>
                {
                    ntfList.map( (item)  => {
                        const { created, origin, message, status, seen } = item;

                        return(
                            ( show_all || ! seen ) &&
                                <NotificationTableLine
                                    key = { created + Date.now() }
                                    created = { created }
                                    origin = { origin }
                                    message = { message }
                                    status = { status }
                                />
                        );
                    })
                }
            </>
    );
};

NotificationTable.propTypes = {
    show_all: PropTypes.bool.isRequired,
    ntfList: PropTypes.array.isRequired
};
export default NotificationTable;