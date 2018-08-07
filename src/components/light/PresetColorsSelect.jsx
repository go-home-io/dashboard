import React, {Component} from 'react'
import ActiveColorBox from "./ActiveColorBox";


class PresetColorsSelect extends Component {
    render () {

        const colors = this.props.presetColors;
        return (
                <div style={{marginTop:5}}>
                    { colors.map( (colorName, index) => {
                        return(
                            <ActiveColorBox  key = {'smColBox'+index}
                                            location={this.props.location}
                                            color={index}
                                            colorName={colorName}  />
                        )
                       })
                    }
                </div>
        )
    }
}

export default PresetColorsSelect