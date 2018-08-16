import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Icon from "@material-ui/core/Icon/Icon";


const ITEM_HEIGHT = 60;

class Scenes extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
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
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.0,
                            width: 200,
                        },
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option} selected={option === 0} onClick={this.handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default Scenes;
