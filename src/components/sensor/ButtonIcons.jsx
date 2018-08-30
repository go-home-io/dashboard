import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const styles = theme => ({
    iconClick: {
        position: 'relative',
        left: 30,
        top: -8,
        color: 'rgba(0,0,0,0.54)',
        fontSize: 40,
    },
    iconDblClick: {
        position: 'relative',
        left: 56,
        top: -8,
        color: 'rgba(0,0,0,0.54)',
        fontSize: 40,
    },
    iconPress: {
        position: 'relative',
        left: 92,
        top: -8,
        color: 'rgba(0,0,0,0.54)',
        fontSize: 40,
    },
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
            <div>
                <Tooltip title={"Click: "+this.props.click} placement="top">
                    <Icon
                        className={classes.iconClick}
                        style={{color:color(this.props.click)}}
                    >
                        done
                    </Icon>
                </Tooltip>
                <Tooltip title={"Double click: "+this.props.double_click} placement="top">
                    <Icon
                        className={classes.iconDblClick}
                        style={{color:color(this.props.double_click)}}
                    >
                        done_all
                    </Icon>
                </Tooltip>
                <Tooltip title={"Press: "+this.props.press} placement="top">
                    <Icon
                        className={classes.iconPress}
                        style={{color:color(this.props.press)}}
                    >
                            done_outline
                    </Icon>
                </Tooltip>
            </div>

        )
    }
}

ButtonIcons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonIcons)

