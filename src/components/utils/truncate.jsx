function truncateCaption(caption, symbols) {
    if ( caption.length <= symbols) {
        return caption;
    } else {
        return caption.substr(0,symbols-2) + "..";
    }
}

export default truncateCaption;

