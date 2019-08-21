function truncateCaption(caption, symbols) {
    if (caption.length <= symbols ) {
        return caption;
    }


    const lines = caption.split(" ");
    if (lines.length > 2 ) {
        return caption;
    }

    console.log(lines[0] + " " + lines[1]);

    if ( lines[1].length <= 5) {
        return caption;
    } else {
        return lines[0] + " " + lines[1].substr(0,symbols-2) + "..";
    }
}

export default truncateCaption;

