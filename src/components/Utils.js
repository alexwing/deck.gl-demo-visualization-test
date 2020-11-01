

export const hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      [ parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)]
    : null;
  }


  export const LightenDarkenColor = function(col,amt) {
    if ( col[0] === "#" ) {
        col = col.slice(1);
    }
    var r = col[0]  * amt;
    var g = col[1]  * amt;
    var b = col[2]  * amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;


    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return[r,g,b];
}