import React from 'react'
import Reflux from 'reflux'
import LightHeader from "./LightHeader";

import LightStoreFactory from "../../reflux/LightStore";

import LightColorPicker from "./LightColorPicker";
import LightLoading from "./LightLoading";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Level from "./Level";
import lightActions from "../../reflux/lightActions";
import Grid from "@material-ui/core/Grid/Grid";
import LevelSlider from "./LevelSlider";

const show_if_loaded = (Comp, selector) => {
    return !selector ? Comp : undefined;
};


class LightManager extends Reflux.Component{
    constructor(props) {
        super(props);
        this.store = LightStoreFactory(props.location, props.start);

    }

    render () {
         const display = this.state.visible ? 'block' : 'none';
         return (
                 <Card style={{minWidth:280, maxWidth:320, display:display}}>
                     <LightHeader key={ 'buttonOn-' + Math.floor(Math.random()*1000) }
                                  location = {this.props.location}
                                  switchOn = {this.state.switchOn}
                                  color = {this.state.color}
                     />

                    <CardContent>

                        <Grid container>
                           { show_if_loaded(
                               <Grid item sm={6}>
                                        <LevelSlider location={this.props.location}
                                               level={this.state.level} />
                               </Grid>,
                                        this.state.loading

                            )}

                           { show_if_loaded(
                               <Grid item sm={6}>
                                    <LightColorPicker location={this.props.location}
                                                      selectedColor={this.state.color}/>
                               </Grid>,
                                                  this.state.loading

                           )}

                            { show_if_loaded(
                                <LightLoading/>,
                                ! this.state.loading
                            )}
                        </Grid>
                    </CardContent>

                </Card>

         )
     }
}


// LightManager.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default (LightManager);