import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton/IconButton";
import ExpandMore from "@material-ui/icons/ExpandMore";
import lightActions from '../../reflux/lightActions';

const ITEM_HEIGHT = 60;

class Scenes extends React.Component {
    state = {
        anchorEl: null,
        dev_id: this.props.dev_id,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (option) => {
        lightActions.setScene(this.state.dev_id, option);
        this.setState({ anchorEl: null });
    };

    render() {
        const options = this.props.scenes;
        const { anchorEl } = this.state;

        return (
            <div>
                <IconButton style={{ width:25, height:25}}
                    aria-label="More"
                    aria-owns={anchorEl ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <ExpandMore style={{color:'grey'}}/>
                    {/*<Icon style={{width:15, height:15, color:'lightgray'}}>settings</Icon>*/}
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    value = {this.state.selectedItem}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.0,
                            width: 200,
                        },
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option} selected={option === 0}
                                  onClick={this.handleClose.bind(this, option)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default Scenes;
