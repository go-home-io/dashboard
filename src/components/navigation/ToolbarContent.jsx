import React from "react";
import Reflux from "reflux";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import NotificationStore from "../../reflux/notification/NotificationStore";
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

class ToolbarContent extends Reflux.Component {
    constructor(props){
        super(props);
        this.state = {
            path: "",
            ntfViewOpen: false,
        };
        this.store = NotificationStore;

        this.ntfViewOpen = this.ntfViewOpen.bind(this);
        this.ntfViewClose = this.ntfViewClose.bind(this);
    }
    ntfViewOpen () {
        this.setState({ ntfViewOpen: true });
    }
    ntfViewClose () {
        this.setState({
            ntfViewOpen: false,
        });
    }
    render() {
        const { classes } = this.props;
        const { unseenCount } = this.state;
        const {  active_page: page, active_location } = this.context;

        return(
            <Grid container justify = "flex-end" alignItems = "center">
                <NotificationsListView
                    open = { this.state.ntfViewOpen }
                    onClose = { this.ntfViewClose }
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
                    onClick = { this.ntfViewOpen }
                >
                    <NotificationCount
                        className = { classes.notificationIcon }
                        unseenCount =  { unseenCount }
                        color = "inherit"
                    />
                </div>
            </ Grid>
        );
    }
}

ToolbarContent.propTypes = {
    classes: PropTypes.object,
};

ToolbarContent.contextType = AppContext;

export default withStyles(styles)(ToolbarContent);