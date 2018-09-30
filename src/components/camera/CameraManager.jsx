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
        height: 641,
        width: 800,
        margin: 5
    },
    bigImage: {
        height: 618,
        width: 800,
        cursor: "pointer",
        // margin: 10
    }
});

// const imageHTMLString = picture => {
//     // eslint-disable-next-line
//     const imageTag = "<img src=" + "\"data:image/jpg;base64, " + picture + "\"" + " />" ;
//     return {__html: imageTag};
// };
//
// const imgDOMElement = picture => {
//     // eslint-disable-next-line
//     return <div dangerouslySetInnerHTML = { imageHTMLString(picture) } />;
// };

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
        const { classes }  = this.props;
        const { device_state, visible, name, preview } = this.state;
        const display = visible ? "block" : "none";
        const { picture } = device_state;
        const image = "data:image/jpg;base64, " + picture  ;

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
                    <Card className = { classes.bigCard } style = { {display:display} }>
                        <div className = { classes.caption }>
                            <Typography variant = 'subheading' className = { classes.typography }>
                                { name }
                            </Typography>
                        </div>
                        <CardMedia
                            className = { classes.bigImage }
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