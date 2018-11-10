import React from "react";
import Reflux from "reflux";
import NotificationStore from "../../reflux/notification/NotificationStore";
import NotificationTableLine from "./NotificationTableLine";

class  NotificationTable extends Reflux.Component {
    constructor (props) {
        super(props);
        this.store = NotificationStore;
    }
    render () {
        const { show_all } = this.props;
        const { ntfList } = this.state;

        // Sort notification list descending
        if (ntfList) {
            ntfList.sort( (a,b) => { return (b.created - a.created); });
        }

        return (
            ntfList ?
                <div>
                    {
                        ntfList.map( (item)  => {
                            const { created, origin, message, status, seen } = item;

                            return(
                                show_all || ! seen ?
                                    <NotificationTableLine
                                        key = { message + created }
                                        created = { created }
                                        origin = { origin }
                                        message = { message }
                                        status = { status }
                                    /> : null
                            );
                        })
                    }
                </div> : null
        );
    }
}

export default NotificationTable;