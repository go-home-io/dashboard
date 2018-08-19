
function rgbColor(color) {
    // Takes the object: color {r:value,g:value,b:value}
    // Return CSS string rgb(value,value,value)
    return 'rgb(' + color.r + ','
                  + color.g + ','
                  + color.b + ')'
}

export default rgbColor