import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemActionWrapper from "./ListItemActionWrapper";
import AppStore from "../../reflux/application/AppStore";
import appActions from "../../reflux/application/appActions";

const styles = theme => ({
    root: {
        width: 200,
        backgroundColor: theme.palette.background.paper,
        // height: 800,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    expand: {
        position: 'relative',
        left: 8,
        top:1,
        color:'rgba(0, 0, 0, 0.54)',
    }
});

class NavBar extends Reflux.Component {
   constructor(props) {
       super(props);
       this.state = { open: false,
                      locations: props.locations};
       this.store = AppStore;
   }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = () => {
        if (this.state.openMenu) {
            appActions.toggleMenu();
        }
    };

    render() {
        const { classes } = this.props;
        const locations = this.props.locations;
        // console.log(locations);

        return (
            <div className={classes.root} >

                <List
                    component="nav"
                    // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
                >
                    <ListItem button
                              onClick = {this.handleClose}
                    >
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Some Link" />
                    </ListItem>
                    <ListItem button
                              onClick = {this.handleClose}
                    >
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Another Link" />
                    </ListItem>

                    <ListItem button onClick={this.handleClick}>

                        <ListItemIcon>
                            <i className="material-icons">
                                room
                            </i>
                        </ListItemIcon>
                        <ListItemText inset primary="Locations" />
                        {this.state.open ? <ExpandLess className={classes.expand}/> :
                                           <ExpandMore className={classes.expand}/>}
                    </ListItem>

                    <Collapse in={this.state.open} timeout="auto" unmountOnExit >
                        <List component="nav"  disablePadding >

                            {locations.map( item => {
                                  return (
                                        <ListItemActionWrapper classes={classes.nested}
                                                               location={item.name}
                                                               icon={item.icon}
                                                               key={item.name}>
                                        </ListItemActionWrapper>
                                  )
                              })
                            }
                        </List>
                    </Collapse>


                </List>

            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
