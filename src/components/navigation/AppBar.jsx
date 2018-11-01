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
import Icon from "@material-ui/core/Icon/Icon";
import Grid from "@material-ui/core/Grid/Grid";
import Badge from "@material-ui/core/Badge/Badge";
import {withRouter} from "react-router-dom";
// import Notification from "../notification/Notification";

const styles = theme => ({
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
        marginLeft: -7,
    }
});

class GoHomeBar extends Reflux.Component {
    static defaultProps = {
        dropdown: {}
    };
    constructor(props){
        super(props);
        this.state = {
            path: ""
        };
        this.store = AppStore;
    }
    componentDidMount () {
        this.setState( { path: this.props.location.pathname });
        // console.log(this.props.location.pathname);
    }
    handleClick () {
        appActions.toggleMenu();
    }
    render() {
        const { classes, source, dropdown } = this.props;
        const { path } = this.state;
        return(
            <div>
                <AppBar position = "fixed">
                    <Toolbar>
                        <Grid container alignItems = 'center'>
                            <Hidden lgUp>
                                <Grid item xs = { 2 } sm = { 1 } md = { 1 }>
                                    <IconButton
                                        className = { classes.button }
                                        aria-label = "Menu"
                                        onClick = { this.handleClick }
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                    <Drawer
                                        anchor = "left"
                                        open = { this.state.openMenu }
                                        onClose = { this.handleClick.bind(this) }
                                    >
                                        <NavBar
                                            dropdown = { dropdown }
                                            closable = { true }
                                        />
                                    </Drawer>
                                </Grid>
                            </Hidden>
                            <Grid item xs = { 7 } sm = { 8 } md = { 8 } lg = { 10 } >
                                <Typography variant = "title" color = "inherit">
                                GO-HOME DASHBOARD
                                </Typography>
                            </Grid>
                            <Grid item xs = { 1 } sm = { 1 } >
                                { path === "/" ?
                                    <div>
                                        <Icon>
                                        location_on
                                        </Icon>
                                        <Typography variant = 'caption' className = { classes.location }>
                                            {this.state.active_location}
                                        </Typography>
                                    </div> : null
                                }
                            </Grid>
                            <Grid item xs = { 2 } sm = { 1 }>
                                <Badge className = { classes.margin } badgeContent = { 3 } color = "secondary">
                                    <Icon className = { classes.notificationIcon }>
                                        notifications
                                    </Icon>
                                </Badge>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

GoHomeBar.propTypes = {
    classes: PropTypes.object.isRequired,
    dropdown: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(GoHomeBar));