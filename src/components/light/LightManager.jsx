import React from 'react'
import Reflux from 'reflux'
import ComponentHeader from "../common/ComponentHeader";
import LightStoreFactory from "../../reflux/light/LightStore";
import IconLoading from "./IconLoading";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid/Grid";
import LightBrightness from "./LightBrightness";
import LightColorPicker from "./LightColorPicker";
import Scenes from "./Scenes";
import Zoom from "@material-ui/core/Zoom/Zoom";
import lightActions from "../../reflux/light/lightActions";
import locationActions from "../../reflux/location/locationActions";
// import Fade from "@material-ui/core/Fade/Fade";
// import AppStore from "../../reflux/application/AppStore";
import storage from "../../services/storage";

const styles = theme => ({
        root: {
            maxWidth:260,
            minWidth:260,
            minHeight:130,
            maxHeight:130,
            marginRight:7,
            marginTop:5,
            marginBottom:5,
            marginLeft:5,
        },
        icon: {
            width:'100%',
            height:'100%',
        }

});

const lightIcon = <i className="fa fa-lightbulb-o" aria-hidden="true"> </i>;

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
        const color = (this.state.device_state.on) ? this.state.device_state.color : {r:100,g:100,b:100};
        const loading = this.state.loading;

        return (
                ! (lightType) ? null :
                 <Card style={{display:display}} className={classes.root}>

                     <ComponentHeader
                         dev_id={this.props.id}
                         name = {this.state.name}
                         on = {this.state.device_state.on}
                         status = {this.state.status}
                         read_only = {this.state.read_only}
                         actions = {lightActions}
                         icon = {lightIcon}
                     />
                     <CardContent>
                         {loading ? null :
                             <Zoom in={!this.state.loading}>
                                 <Grid container justify='flex-start' alignItems='center' alignContent='center'>
                                     {isBrightnessControl ?
                                         <LightBrightness dev_id={this.props.id}
                                                          level={this.state.device_state.brightness}
                                                          read_only={this.state.read_only}
                                         /> : null
                                     }
                                     {isColorControl ?
                                         <LightColorPicker dev_id={this.props.id}
                                                           color={color}
                                                           read_only={this.state.read_only}
                                         />
                                         : null
                                     }
                                     {scenesExist ?
                                         <Scenes dev_id={this.props.id}
                                                 scenes={scenes}
                                                 read_only={this.state.read_only}
                                         />
                                         : null
                                     }
                                 </Grid>
                             </Zoom>
                         }
                         {loading ?
                             <Zoom in={loading}>
                                 <div className={classes.icon}>
                                     <IconLoading dev_id={this.props.id} />
                                 </div>
                             </Zoom>
                             : null
                         }
                     </CardContent>
                </Card>
        )
     }
}


LightManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightManager);