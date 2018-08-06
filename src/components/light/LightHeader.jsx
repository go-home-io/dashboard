import React from 'react'
import Reflux from 'reflux'
import lightActions from "../../reflux/lightActions"
import Switch from '@material-ui/core/Switch';
// import LightStoreFactory from "./reflux/LightStore";
import Icon from "@material-ui/core/es/Icon/Icon";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import BigColorBox from "./BigColorBox";



class LightHeader extends Reflux.Component {

     constructor(props) {
         super(props);
         this.handleClick = this.handleClick.bind(this);
     }

    handleClick () {
        lightActions.switch(this.props.location);
    }

    render () {
        // Styles
        const cursor = 'pointer';
        const color = (this.props.switchOn) ? 'secondary' : 'primary';
        const margins = {marginTop:5, marginLeft:15};
      //  alert(this.props.switchOn);
        return (
                <Grid container>
                    <Grid item sm={11}
                          style={{cursor:cursor}}
                          onClick={this.handleClick} >

                        <Icon color={color} style={{float:'left'}}> wb_sunny </Icon>

                        <Typography variant="subheading"
                                    style={{float:'left', marginLeft:10}}>
                            {this.props.location}
                        </Typography>

                    </Grid>
                    <Grid item sm={1}>

                   </Grid>
                </Grid>

        )
    }
}



export default LightHeader