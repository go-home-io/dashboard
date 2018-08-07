import React from 'react'
import Reflux from 'reflux'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/es/styles/withStyles";

import lightActions from "../../reflux/lightActions"
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import LevelSlider from "./LevelSlider";

const style = theme => ({
    root : {
        marginTop:10,
    },
    label: {
        marginLeft:12,
    },
    iconMinus: {
        float:'left',
        cursor:'pointer',
    },
    iconPlus:{
        float:'left',
        cursor:'pointer',
    },
    bar:{
        // float:'left',
        marginTop:10,
    },
});


class LightLevel extends Reflux.Component {
    constructor(props) {
        super(props);

        this.onPlus = this.onPlus.bind(this);
        this.onMinus = this.onMinus.bind(this);
    }

    onPlus () {
        let level = this.props.level + 10;
        if (level > 100) {
            level = 100
        }
        lightActions.setLevel(this.props.location, level);
    }

    onMinus () {
        let level = this.props.level - 10;
        if ( level < 0) {
            level = 0
        }
        lightActions.setLevel(this.props.location, level);
    }

    render () {
        const {classes} = this.props;

        return (
            <Grid container className={classes.root}>
                <Grid item sm={5}  >
                    <div className={classes.label}>
                        <Typography variant={'body1'}>
                            Level: {this.props.level}%
                        </Typography>
                    </div>
                </Grid>
                {/*<Grid item xs={1} >*/}
                    {/*<div onClick={this.onMinus}*/}
                         {/*className={classes.iconMinus} >*/}
                        {/*<Icon>*/}
                            {/*expand_more*/}
                        {/*</Icon>*/}
                    {/*</div>*/}
                {/*</Grid>*/}
                <Grid item xs={7} >
                    <LevelSlider variant="determinate"
                                 level={this.props.level}
                                 location={this.props.location}
                                 className={classes.bar}
                    />

                </Grid>
                {/*<Grid item xs={1}>*/}
                   {/*<div onClick={this.onPlus}*/}
                         {/*className={classes.iconPlus}>*/}
                        {/*<Icon>*/}
                            {/*expand_less*/}
                        {/*</Icon>*/}
                    {/*</div>*/}

                {/*</Grid>*/}
            </Grid>

        )
    }
}

LightLevel.PropTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(style)(LightLevel)