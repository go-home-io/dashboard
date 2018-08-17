import React from 'react'
import Reflux from 'reflux'
import LightHeader from "./LightHeader";

import LightStoreFactory from "../../reflux/LightStore";

import LightColorPicker from "./LightColorPicker";
import LightLoading from "./LightLoading";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid/Grid";
import LevelSlider from "./LevelSlider";
import renderIfExist from "../../services/renderIfExist"

const styles = theme => ({
        root: {
            minWidth:300,
            maxWidth:330,
            marginRight:7,
            marginTop:5,
            marginBottom:5,
            marginLeft:5,
    },

});




class LightManager extends Reflux.Component{
    constructor(props) {
        super(props);
        this.store = LightStoreFactory(props.id, props.device_state);
    }

    render () {
        const {classes} = this.props;
        const display = this.state.visible ? 'block' : 'none';
        const lightType = this.props.device_state.type === 'light';
        const normalSlider = this.state.device_state.brightness != null;

        return (
                ! (lightType) ? null :
                 <Card style={{display:display}} className={classes.root}>

                     <LightHeader scenes={this.state.device_state.scenes}
                                  name = {this.state.name}
                                  on = {this.state.device_state.on}
                     />

                     <CardContent>
                         <Grid container>
                             {normalSlider ?

                                 <LevelSlider dev_id={this.props.id}
                                              level={this.state.device_state.brightness}
                                              loading={this.state.loading}
                                 />: null


                             }

                             { renderIfExist(this.state.device_state.color,
                                 <LightColorPicker dev_id={this.props.id}
                                                   color={this.state.device_state.color}
                                                   loading={this.state.loading}
                                 />
                             )}


                              <LightLoading loading = {this.state.loading}
                              />

                        </Grid>
                    </CardContent>

                </Card>

         )
     }
}


LightManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightManager);