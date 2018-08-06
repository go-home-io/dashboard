import React from 'react'
import Reflux from 'reflux'
import LightHeader from "./LightHeader";

import LightStoreFactory from "../../reflux/LightStore";
import ButtonSubmit from "./ButtonSubmit";

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

// const styles = {
//     card: {
//         minWidth: 275,
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         marginBottom: 16,
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// };

const show_if_loaded = (Comp, selector) => {
    return !selector ? Comp : undefined;
};


class LightManager extends Reflux.Component{
    constructor(props) {
        super(props);
        this.store = LightStoreFactory(props.location, props.start);

    }

    render () {
        // alert(this.state.loading);
        //  lightActions.visible('Living Room');

         const display = this.state.visible ? 'block' : 'none';

         return (
                 <Card style={{minWidth:280, maxWidth:320, display:display}}>

                    <CardContent>

                        <LightHeader key={ 'buttonOn-' + Math.floor(Math.random()*1000) }
                                    location = {this.props.location}
                                    switchOn = {this.state.switchOn}
                                    color = {this.state.color}
                        />

                       { show_if_loaded(
                                    <Level location={this.props.location}
                                           level={this.state.level} />,
                                    this.state.loading
                        )}

                       { show_if_loaded(
                            <LightColorPicker location={this.props.location}
                                              selectedColor={this.state.color}/>,
                                              this.state.loading

                       )}

                        { show_if_loaded(
                            <LightLoading/>,
                            ! this.state.loading
                        )}
                    </CardContent>
                    <CardActions >
                         <ButtonSubmit location={this.props.location}
                                       caption={'Apply'}
                         />

                    </CardActions>
                </Card>

         )
     }
}


// LightManager.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default (LightManager);