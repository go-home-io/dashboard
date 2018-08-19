import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton/IconButton";
import ExpandMore from "@material-ui/icons/ExpandMore";
import lightActions from '../../reflux/lightActions';
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 60;

const styles = theme => ( {
    root: {
        width: '100%',
        marginTop: 6,
    },
    text: {
        fontSize:12,
        letterSpacing:1,
        fontColor:'lightgray',
        cursor:'pointer',
    },
    button: {
        position: 'relative',
        top: -5,
        left: 29,
    },
});



class Scenes extends React.Component {
    state = {
        anchorEl: null,
        dev_id: this.props.dev_id,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (option) => {
        if (typeof(option) === 'string') {
            lightActions.setScene(this.state.dev_id, option);
        }
        this.setState({ anchorEl: null });
    };

    render() {
        const {classes} = this.props;
        const options = this.props.scenes;
        const { anchorEl } = this.state;

        return (
            this.props.loading ? null :
            <Grid container className={classes.root}>

                <div id="label" className={classes.text} onClick={this.handleClick}>
                    Scenes
                </div>
                {/*<IconButton style={{ width:25, height:25}}*/}
                            {/*className={classes.button}*/}
                            {/*aria-label="More"*/}
                            {/*aria-owns={anchorEl ? 'long-menu' : null}*/}
                            {/*aria-haspopup="true"*/}
                            {/*onClick={this.handleClick}*/}
                {/*>*/}
                    {/*<ExpandMore style={{color:'grey'}}/>*/}
                {/*</IconButton>*/}
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
            </Grid>
        );
    }
}

Scenes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Scenes);
