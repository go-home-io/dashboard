import React, {useContext, useState} from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import NotificationCount from "../notification/NotificationCount";
import LocationIcon from "@material-ui/icons/LocationOn";
import NotificationsListView from "../notification/NotificationsListView";
import {AppContext} from "../../context/AppContextProvider";

const styles = () => ({
    notificationContainer: {
        paddingRight: 50,
    },
    notificationIcon: {
        cursor: "pointer",
    },
    location: {
        marginRight: 50,
    },
});

const ToolbarContent  = props => {
    const { classes } = props;
    // const { ntfList } = useContext(NotificationContext);
    const {  active_page: page, active_location, unseenNotiCount } = useContext(AppContext);
    const [ ntfViewOpen, setNtfViewOpen ] = useState(false);

    return(
        <Grid container justify = "flex-end" alignItems = "center">
            <NotificationsListView
                open = { ntfViewOpen }
                onClose = { () => setNtfViewOpen(false) }
            />
            { page === "devices" &&
                <div className = { classes.location }>
                    <LocationIcon />
                    <Typography variant = 'caption' color = "inherit">
                        { active_location }
                    </Typography>
                </div>
            }
            <div
                className = { classes.notificationContainer }
                onClick = { () => setNtfViewOpen(true) }
            >
                <NotificationCount
                    className = { classes.notificationIcon }
                    unseenCount =  { unseenNotiCount }
                    color = "inherit"
                />
            </div>
        </ Grid>
    );
};

ToolbarContent.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ToolbarContent);