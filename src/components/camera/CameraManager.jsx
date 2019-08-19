import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CameraStoreFactory from "../../reflux/camera/CameraStore";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Typography from "@material-ui/core/Typography/Typography";
import Zoom from "@material-ui/core/Zoom/Zoom";

const styles = () => ({
    root: {
        width: 172,
        height:165,
        margin: 5,
    },
    caption: {
        height:23,
        backgroundColor:"rgba(0,0,0,0.35)",
    },
    typography: {
        color: "#ffffff",
        marginLeft: 5,
        marginBottom: 3,
    },
    media: {
        height: 150,
        cursor: "pointer",
    },
    bigCard: {
        margin: 5,
    },
    bigImage: {
        cursor: "pointer",
    }
});

let naturalWidth = 0;
let naturalHeight = 0;

const imageSrc = (picture) => {
    return "data:image/jpg;base64, " + picture ;
};

class CameraManager extends Reflux.Component{
    constructor(props) {
        super(props);
        const { id, device_info, location, group_id } = props;
        this.state = {preview: true};
        this.store = CameraStoreFactory(id, device_info, location, group_id);
    }
    handleClick () {
        const { preview } = this.state;
        this.setState({ preview: ! preview });
    }

    render () {
        const { visible, classes }  = this.props;
        const { device_state,  name, preview } = this.state;
        const display = visible ? "block" : "none";
        const { picture } = device_state;
        const image = imageSrc(picture); // "data:image/jpg;base64, " + picture ;
        const img = new Image();
        img.src = image;
        if (naturalHeight === 0 || naturalWidth === 0) {
            naturalWidth = img.naturalWidth;
            naturalHeight = img.naturalHeight;
        }
        return (
            preview ?
                <Card style = { {display:display} } className = { classes.root }>
                    <div className = { classes.caption }>
                        <Typography variant = 'subheading' className = { classes.typography }>
                            { name }
                        </Typography>
                    </div>

                    <CardMedia
                        className = { classes.media }
                        image = { image }
                        onClick = { this.handleClick.bind(this) }
                    />
                </Card>
                :
                <Zoom in = { ! preview }  >
                    <Card style = { {display:display} } className = { classes.bigCard }>
                        <div className = { classes.caption }>
                            <Typography variant = 'subheading' className = { classes.typography }>
                                { name }
                            </Typography>
                        </div>
                        <CardMedia
                            className = { classes.bigImage }
                            style = { {width: naturalWidth, height: naturalHeight} }
                            image = { image }
                            onClick = { this.handleClick.bind(this) }
                        />
                    </Card>
                </Zoom>
        );
    }
}

CameraManager.propTypes = {
    classes: PropTypes.object.isRequired,
    device_info: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    group_id: PropTypes.string
};

export default withStyles(styles)(CameraManager);