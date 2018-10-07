import React from 'react'

const Icon8 = ( props ) => {
    const {icon , color, fontSize: fntSz} = props;
    const clr = color.substring(1);
    const fontSize = ( fntSz === "2x" ) ? 48:
                         ( fntSz === "3x" ) ? 96 : 24;

    const sourceUrl = "https://png.icons8.com/material/" + fontSize+ "/" + clr + "/" + icon + ".png";
    return (
        <div>
            <img  src={sourceUrl}/>
        </div>
    )
};

export default Icon8