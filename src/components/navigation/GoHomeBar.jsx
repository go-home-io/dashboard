import React from 'react'
import Reflux from 'reflux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from "@material-ui/core/IconButton/IconButton";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden/Hidden";
import NavBar from "./NavBar";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer/Drawer";
import AppStore from "../../reflux/application/AppStore";
import appActions from "../../reflux/application/appActions";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        color: 'white',
    },

});

class GoHomeBar extends Reflux.Component {
    constructor(props){
        super(props);
        // this.state = {open:false};
        this.store = AppStore;
    }

    handleClick () {
        appActions.toggleMenu();
    }


    render() {
        const {classes} = this.props;
        const locations = this.props.locations;
        // console.log('App Bar:');
        // console.log(this.state);

        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Hidden lgUp>
                            <IconButton  className={classes.button}
                                         aria-label="Menu"
                                         onClick={this.handleClick.bind(this)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Drawer
                                anchor="top"
                                open={this.state.openMenu}
                                onClose={this.handleClick.bind(this)}
                            >
                                <NavBar
                                    locations={locations}
                                    closable = {true}
                                />
                            </Drawer>

                        </Hidden>
                        <Typography variant="title" color="inherit">
                            GO-HOME DASHBOARD
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
 }

 GoHomeBar.propTypes = {
     classes: PropTypes.object.isRequired,
 };

export default withStyles(styles)(GoHomeBar);