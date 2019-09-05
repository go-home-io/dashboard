import React, {useContext, useEffect} from "react";
// import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from "notistack";
import storage from "../../services/storage";
import {EventEmitter} from "../../context/EventEmitter";
import {AppContext} from "../../context/AppContextProvider";

function NotificationListener() {
    const { enqueueSnackbar } = useSnackbar();
    const { setUnseenCount, setNotiList } = useContext(AppContext);

    const showNotification  = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, {variant: variant} );
    };

    const unseenCount = (notiList) => {
        if (! notiList) return 0;
        let count = 0;
        notiList.forEach( item => {
            if (! item.seen ) count += 1;
        });
        return count;
    };

    const onMessage = (mess) => {
        const { id, state } = mess;
        if ( id === "notification") {
            // Save notification to state context and to storage
            state.seen = false;
            let newNtfList = storage.get("notificationsList");
            newNtfList.push(state);
            storage.set("notificationsList", newNtfList);
            setUnseenCount(unseenCount(newNtfList));
            setNotiList(newNtfList);

            // Show notification
            const message = state.origin.toUpperCase() + ": " + state.message;
            showNotification(message, state.status);
        }
    };

    // const { ntfList, setNtfList } = useContext(NotificationContext);

    const { subscribe } = useContext(EventEmitter);
    useEffect( () => subscribe("message", onMessage),
    // eslint-disable-next-line
        []);

    return <> </>;
}

export default function Notification() {
    return (
        <SnackbarProvider
            maxSnack = { 3 }
            anchorOrigin = { {
                vertical: "top",
                horizontal: "right",
            } }
        >
            <NotificationListener />
        </SnackbarProvider>
    );
}
