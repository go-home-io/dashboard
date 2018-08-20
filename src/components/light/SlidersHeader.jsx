import React from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

class SlidersHeader extends React.Component {
    render () {
        const color = (this.props.color);
        return (
            <Grid container justify='center'>
                <Grid item sm={10}>
                    <Typography variant="subheading" gutterBottom align="center">
                        {this.props.caption}
                    </Typography>
                </Grid>
                { color ?
                    <Grid item sm={2}>
                        <div style={{ backgroundColor: color,
                                      width:50,
                                      height:20,}}>
                        </div>
                    </Grid> :
                    <Grid item sm={2}>
                        <Typography variant="subheading" gutterBottom align="center">
                            {this.props.level}%
                        </Typography>
                    </Grid>
                }
            </Grid>
        )
    }
}

export default SlidersHeader