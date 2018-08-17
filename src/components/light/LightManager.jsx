import React from 'react'
import Reflux from 'reflux'
import LightHeader from "./LightHeader";

import LightStoreFactory from "../../reflux/LightStore";

import LightColorPicker from "./LightColorPicker";
import IconLoading from "./IconLoading";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid/Grid";
import LevelSlider from "./LevelSlider";
import renderIfExist from "../renderIfExist"

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
        const isBrightnessControl = (this.state.device_state.brightness != null);
        const isColorControl = (this.state.device_state.color != null);

        return (
                ! (lightType) ? null :
                 <Card style={{display:display}} className={classes.root}>

                     <LightHeader dev_id={this.props.id}
                                  scenes={this.state.device_state.scenes}
                                  name = {this.state.name}
                                  on = {this.state.device_state.on}
                     />

                     <CardContent>
                         <Grid container>
                             {isBrightnessControl ?
                                 <LevelSlider dev_id={this.props.id}
                                              level={this.state.device_state.brightness}
                                              loading={this.state.loading}
                                 /> : null
                             }
                             { isColorControl ?
                                 <LightColorPicker dev_id={this.props.id}
                                                   color={this.state.device_state.color}
                                                   loading={this.state.loading}
                                 /> : null
                             }
                             <IconLoading loading = {this.state.loading}/>
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