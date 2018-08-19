import React from 'react'
import Reflux from 'reflux'
import lightActions from "../../reflux/lightActions"
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import Scenes from "./Scenes";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import rgbColor from "../utils/rgbColor";

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 10,
        backgroundColor:'#e8e7e836',

    },
    root: {

        marginLeft: 10,
        marginTop:-7,
        marginBottom:0,
    },
    icon: {
        float:'left',
        cursor:'pointer',
    },
    typography: {
        float:'left',
        marginLeft:10,
        cursor:'pointer',
    },

});


class LightHeader extends Reflux.Component {

     constructor(props) {
         super(props);
         this.handleClick = this.handleClick.bind(this);
     }

    handleClick () {
         lightActions.toggle(this.props.dev_id);
    }

    render () {
        // Styles
        const {classes} = this.props;
        const color = (this.props.color) ? rgbColor(this.props.color) :
                         this.props.on ? 'gold' : rgbColor(100,100,100);

        return (
            <Paper className={classes.paper} elevation={0}>
                <Grid container className={classes.root} >

                      <Grid item sm={10}>
                         <Icon style={{color:color}}
                               className={classes.icon}
                               onClick={this.handleClick}
                         >
                             <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                         </Icon>

                         <Typography variant="subheading"
                                     className={classes.typography}
                                     onClick={this.handleClick}
                         >

                            {this.props.name}
                         </Typography>
                      </Grid>

                 </Grid>
            </Paper>


        )
    }
}

LightHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightHeader)