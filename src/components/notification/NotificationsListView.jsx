import React, {useContext, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import NotificationTable from "./NotificationTable";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import storage from "../../services/storage";
import {AppContext} from "../../context/AppContextProvider";
import Slide from "@material-ui/core/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction = "down" ref = { ref } { ...props } />;
});

// eslint-disable-next-line react/no-multi-comp
const NotificationsListView = props => {

    const { open, onClose } = props;
    const [showAll, setShowAll] = useState(false);
    const { notiList, setNotiList, setUnseenCount } =  useContext(AppContext);

    const unseenCount = (notiList) => {
        if (! notiList) return 0;
        let count = 0;
        notiList.forEach( item => {
            if ( ! item.seen ) count += 1;
        });
        return count;
    };

    const markSeen  = () => {
        let newList = storage.get("notificationsList");
        if ( ! newList ) return ;
        for (let i=0; i < newList.length; i++) {
            newList[i].seen = true;
        }
        setNotiList(newList);
        setUnseenCount(unseenCount(newList));
        storage.set("notificationsList", newList);
    };

    const beforeClose = () => {
        setShowAll(false);
        markSeen();
        onClose();
    };

    const toggleShow = () => {
        setShowAll( oldValue => ( ! oldValue ));
    };

    const dismissAll = () => {
        setNotiList([]);
        storage.set("notificationsList", []);
        setShowAll(false);
        setUnseenCount(0);
        onClose();
    };

    return (
        <React.Fragment>
            <Dialog
                open = { open }
                scroll = "body"
                TransitionComponent = { Transition }
                keepMounted
                onClose = { beforeClose }
                aria-labelledby = "alert-dialog-slide-title"
                aria-describedby = "alert-dialog-slide-description"
            >
                <DialogTitle id = "simple-dialog-title">
                    { "Notifications" }
                </DialogTitle>
                <DialogContent>
                    <NotificationTable
                        id = "alert-dialog-slide-description"
                        show_all = { showAll }
                        ntfList = { notiList }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick = { beforeClose } color = "primary" size = "small">
                        Close
                    </Button>
                    <Button onClick = { toggleShow } color = "primary" size = "small">
                        { showAll ?
                            <div>
                                { "Show new" }
                            </div>
                            :
                            <div>
                                { "Show all" }
                            </div>
                        }
                    </Button>
                    { showAll &&
                        <Button onClick = { dismissAll } color = "secondary" size = "small">
                            Clear all
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

NotificationsListView.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default NotificationsListView;
