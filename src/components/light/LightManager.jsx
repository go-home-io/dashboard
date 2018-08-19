import React from 'react'
import Reflux from 'reflux'
import LightHeader from "./LightHeader";
import LightStoreFactory from "../../reflux/LightStore";
import IconLoading from "./IconLoading";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid/Grid";
import LightBrightness from "./LightBrightness";
import NewColorPicker from "./NewColorPicker";
import Scenes from "./Scenes";

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
        this.store = LightStoreFactory(props.id, props.device_state, props.location, props.group_id);
    }

    render () {
        const {classes} = this.props;
        const display = this.state.visible ? 'block' : 'none';
        const lightType = this.props.device_state.type === 'light';
        const isBrightnessControl = (this.state.device_state.brightness != null);
        const isColorControl = (this.state.device_state.color != null);
        const scenes = this.state.device_state.scenes;
        const scenesExist = (scenes != null);

        return (
                ! (lightType) ? null :
                 <Card style={{display:display}} className={classes.root}>

                     <LightHeader dev_id={this.props.id}
                                  name = {this.state.name}
                                  on = {this.state.device_state.on}
                     />

                     <CardContent>
                         <Grid container justify='center'>

                                 {isBrightnessControl ?
                                         <LightBrightness dev_id={this.props.id}
                                                          level={this.state.device_state.brightness}
                                                          loading={this.state.loading}
                                         />
                                         : null
                                 }

                                 { isColorControl ?
                                         <NewColorPicker dev_id={this.props.id}
                                                         color={this.state.device_state.color}
                                                         loading={this.state.loading}
                                         />
                                         : null
                                 }
                                 { scenesExist ?
                                     <Scenes  dev_id={this.props.id}
                                              scenes={scenes}
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