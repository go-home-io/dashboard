import React from "react";
import Reflux from "reflux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden/Hidden";
import NavBar from "./NavBar";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer/Drawer";
import AppStore from "../../reflux/application/AppStore";
import appActions from "../../reflux/application/appActions";
import Grid from "@material-ui/core/Grid/Grid";
import {withRouter} from "react-router-dom";
import NotificationStore from "../../reflux/notification/NotificationStore";
import NotificationCount from "../notification/NotificationCount";
import LocationIcon from "@material-ui/icons/LocationOn";
import NotificationsListView from "../notification/NotificationsListView";

const styles = theme => ({
    paper: {
        float: "right",
        marginTop: 75,
        marginRight: 15,
        width: theme.spacing.unit * 40,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
        color: "white",
    },
    notificationIcon: {
        cursor: "pointer",
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    location: {
        color: "white",
        display: "flex",
        alignItems: "center",
    }
});

class GoHomeBar extends Reflux.Component {
    static defaultProps = {
        dropdown: {}
    };
    constructor(props){
        super(props);
        this.state = {
            path: "",
            ntfViewOpen: false,
        };
        this.stores = [AppStore, NotificationStore];

        this.sideMenuClose = this.sideMenuClose.bind(this);
        this.ntfViewOpen = this.ntfViewOpen.bind(this);
        this.ntfViewClose = this.ntfViewClose.bind(this);
    }
    componentDidMount () {
        // Router props
        this.setState( { path: this.props.location.pathname });
    }
    sideMenuClose () {
        appActions.toggleMenu();
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
        const { classes, dropdown } = this.props;
        const { path, unseenCount, active_location, openMenu } = this.state;

        return(
            <div>
                <AppBar position = "fixed" color = "primary">
                    <Toolbar>
                        <Grid container alignItems = 'center'>
                            <Hidden lgUp>
                                <Grid item xs = { 2 } sm = { 1 }>
                                    <IconButton
                                        className = { classes.button }
                                        aria-label = "Menu"
                                        onClick = { this.sideMenuClose }
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                    <Drawer
                                        anchor = "left"
                                        open = { openMenu }
                                        onClose = { this.sideMenuClose }
                                    >
                                        <NavBar
                                            dropdown = { dropdown }
                                            closable = { true }
                                        />
                                    </Drawer>
                                </Grid>
                            </Hidden>

                            <Grid item xs = { 7 } sm = { 8 } lg = { 9 } >
                                <Typography variant = "title" color = "inherit">
                                    GO-HOME DASHBOARD
                                </Typography>
                            </Grid>

                            <Grid item xs = { 2 }  >
                                { path === "/" ?
                                    <div>
                                        <LocationIcon/>
                                        <Typography variant = 'caption' className = { classes.location }>
                                            { active_location }
                                        </Typography>
                                    </div>
                                    :
                                    null
                                }
                            </Grid>

                            <Grid item xs = { 1 }>
                                <div onClick = { this.ntfViewOpen }>
                                    <NotificationCount
                                        className = { classes.notificationIcon }
                                        unseenCount =  { unseenCount }
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <NotificationsListView
                    open = { this.state.ntfViewOpen }
                    onClose = { this.ntfViewClose }
                />
            </div>
        );
    }
}

GoHomeBar.propTypes = {
    classes: PropTypes.object.isRequired,
    dropdown: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(GoHomeBar));