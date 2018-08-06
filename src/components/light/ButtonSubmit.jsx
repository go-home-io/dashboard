import React, {Component} from 'react'
import Reflux from 'reflux'
import lightActions from '../../reflux/lightActions'
import Button from '@material-ui/core/Button';


class ButtonSubmit  extends Reflux.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        lightActions.apply(this.props.location);
    }

    render () {
        return (
                <Button color="primary"
                        onClick={this.handleClick}
                        style={{marginTop:-15}}
                >
                    {this.props.caption}
                </Button>
        )
    }

}

export default ButtonSubmit