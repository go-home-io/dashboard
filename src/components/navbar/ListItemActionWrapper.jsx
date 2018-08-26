import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from "@material-ui/core/Icon/Icon";
import locationActions from "../../reflux/locationActions";


class ListItemActionWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick () {
        locationActions.visible(this.props.location);
    }

    render () {
        return (
            <ListItem button
                      onClick={this.handleClick}
                      className={this.props.classes}>

                <Icon style={{color:'gray'}}>
                    {this.props.icon}
                </Icon>
                <ListItemText  inset primary={this.props.location} />

            </ListItem>
        )
    }

}

export default ListItemActionWrapper;