function truncateCaption(caption, symbols) {
    // if (caption.length <= symbols ) {
    //     return caption;
    // }


    const lines = caption.split(" ");


    if (lines.length > 2 ) {
        return caption;
    }
    if (lines.length ===1 && caption.length >=14) {
        return caption.substr(0,symbols-2) + "..";
    }

    // console.log('truncate:', lines[0] + " " + lines[1]);
    return caption;
    // if ( lines[1].length <= 12) {
    //     return caption;
    // } else {
    //     return lines[0] + " " + lines[1].substr(0,symbols-2) + "..";
    // }
}

export default truncateCaption;

