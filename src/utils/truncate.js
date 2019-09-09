const truncateCaption = (caption, maxSymbols) => {
    if (caption.length <= maxSymbols ) {
        return caption;
    }
    const lines = caption.split(" ");

    if (lines.length > 2 ) {
        return caption;
    }
    if (lines.length === 1 || !lines[1]) {
        if (caption.length <= maxSymbols) {
            return caption;
        } else {
            return caption.substr(0,maxSymbols-2) + "..";
        }
    }

    if ( lines[1].length <= maxSymbols) {
        return caption;
    } else {
        return lines[0] + " " + lines[1].substr(0,maxSymbols-2) + "..";
    }
};

export default truncateCaption;

