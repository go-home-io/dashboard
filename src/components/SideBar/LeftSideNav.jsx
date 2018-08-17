import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ListItemActionWrapper from "./ListItemActionWrapper";
import location from '../location/locations'

const styles = theme => ({
    root: {
        width: 200,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class LeftSideNav extends React.Component {
    state = { open: false };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <List
                    component="nav"
                    // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Some Link" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Another Link" />
                    </ListItem>

                    <ListItem button onClick={this.handleClick}>
                            <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Location" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="nav" disablePadding >
                            {location.map(function (item) {

                                    return (
                                        <ListItemActionWrapper classes={classes.nested}
                                                               location={item.room}
                                                               icon={item.icon}
                                                               key={'liAW'+Math.floor(Math.random()*10000)}>
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

LeftSideNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftSideNav);
