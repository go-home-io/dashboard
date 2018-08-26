import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from "@material-ui/core/IconButton/IconButton";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Icon from "@material-ui/core/Icon/Icon";
// import Collapse from "@material-ui/core/Collapse/Collapse";
import LeftSideNav from "./NavBar";
// import locations from "../location/locations";
// import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";

import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer/Drawer";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        color: 'white',
    },

});

class GoHomeBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {open:false};

    }

    handleClick () {
        this.setState({open:!this.state.open})
    }

    // toggleDrawer (open) {
    //     this.setState({open:open})
    // }

    render() {
        const {classes} = this.props;
        const locations = this.props.locations;
        // console.log('App Bar:');
        // console.log(this.props.locations);

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
                                open={this.state.open}
                                onClose={this.handleClick.bind(this)}
                                // onOpen={this.toggleDrawer(true)}
                            >
                             {/*<div role="button" onClick={this.toggleDrawer(false)}>*/}
                               <LeftSideNav locations={locations}/>
                             {/*</div>*/}
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