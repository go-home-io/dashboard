import React, {Component} from 'react'
// import {Col, Row} from "react-bootstrap";
import SmallColorBox from './SmallColorBox'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/es/styles/withStyles";
import BigColorBox from './BigColorBox'
import colors from './colors'
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

const style = theme => ({
    root : {
        marginTop:10,
    },
    label: {
        marginLeft:10,
    },
    color: {

    }
});


class LightColorPicker extends Component {

    render () {
        const classes = this.props;

        return (
                <Grid container
                      className={classes.root}>
                    <Grid item sm={5}>
                        <div className={classes.label} style={{marginLeft:10}}>
                            <Typography variant={'body1'}>
                                Color:<BigColorBox color={this.props.selectedColor}/>
                            </Typography>
                        </div>
                    </Grid>
                    {/*<Grid item sm={0}> </Grid>*/}
                    <Grid item sm={7} >
                        {colors.map( (colorName, index) => {
                           return(
                                       <SmallColorBox  key = {'smColBox'+index}
                                                   location={this.props.location}
                                                   color={index}
                                                   colorName={colorName}  />
                                 )
                           })
                        }


                    </Grid>

                </Grid>


        )
    }
}

LightColorPicker.PropTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(LightColorPicker)

