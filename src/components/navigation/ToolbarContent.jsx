import React from "react";
import Reflux from "reflux";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppStore from "../../reflux/application/AppStore";
import Grid from "@material-ui/core/Grid/Grid";
import {withRouter} from "react-router-dom";
import NotificationStore from "../../reflux/notification/NotificationStore";
import NotificationCount from "../notification/NotificationCount";
import LocationIcon from "@material-ui/icons/LocationOn";
import NotificationsListView from "../notification/NotificationsListView";

const colorGrey = "rgb(0,0,0,0.54)";
const styles = () => ({
    notificationIcon: {
        cursor: "pointer",
        color: colorGrey,
    },
    location: {
        color: colorGrey,
    }
});

class ToolbarContent extends Reflux.Component {
    constructor(props){
        super(props);
        this.state = {
            path: "",
            ntfViewOpen: false,
        };
        this.stores = [AppStore, NotificationStore];

        this.ntfViewOpen = this.ntfViewOpen.bind(this);
        this.ntfViewClose = this.ntfViewClose.bind(this);
    }
    componentDidMount () {
        // Router props
        this.setState( { path: this.props.location.pathname });
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
        const { path, unseenCount, active_location } = this.state;

        return(
            <Grid container justify = "center" alignItems = "center">

                <Grid item xs = { 9 }>
                    <NotificationsListView
                        open = { this.state.ntfViewOpen }
                        onClose = { this.ntfViewClose }
                    />
                </Grid>

                <Grid item xs = { 2 }>
                    { path === "/" ?
                        <div className = { classes.location }>
                            <LocationIcon />
                            <Typography variant = 'caption'>
                                { active_location }
                            </Typography>
                        </div>
                        :
                        null
                    }
                </Grid>

                <Grid item xs = { 1 } onClick = { this.ntfViewOpen }>
                    <NotificationCount
                        className = { classes.notificationIcon }
                        unseenCount =  { unseenCount }
                        color = "default"
                    />
                </Grid>
            </ Grid>
        );
    }
}

Toolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ToolbarContent));