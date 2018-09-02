import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import GoHomeBar from "../navigation/GoHomeBar";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    root: {
        // position: 'relative',
        // left: 30,
        // top: -8,
        // color: 'rgba(0,0,0,0.54)',
        // fontSize: 40,
        marginTop: -3,
    },
    icon: {
        // position: 'relative',
        // left: 56,
        // top: -8,
        color: 'rgba(0,0,0,0.54)',
        fontSize: 38,
    },
    // iconPress: {
    //     // position: 'relative',
    //     // left: 92,
    //     // top: -8,
    //     color: 'rgba(0,0,0,0.54)',
    //     fontSize: 40,
    // },
});

const color = (state) => {
    if (state) {
        return 'rgba(0,0,0,0.54)';
    } else {
        return 'rgba(0,0,0,0.3)';
    }
};

class ButtonIcons extends React.Component {
    render () {
        const {classes} = this.props;

        return (
            <Grid container justify='center' alignItems='center' className={classes.root}>
                <Tooltip title={"Click: "+this.props.click} placement="top">
                    <Icon
                        className={classes.icon}
                        style={{color:color(this.props.click)}}
                    >
                        done
                    </Icon>
                </Tooltip>
                <Tooltip title={"Double click: "+this.props.double_click} placement="top">
                    <Icon
                        className={classes.icon}
                        style={{color:color(this.props.double_click)}}
                    >
                        done_all
                    </Icon>
                </Tooltip>
                <Tooltip title={"Press: "+this.props.press} placement="top">
                    <Icon
                        className={classes.icon}
                        style={{color:color(this.props.press)}}
                    >
                            done_outline
                    </Icon>
                </Tooltip>
            </Grid>

        )
    }
}

ButtonIcons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonIcons)

