export const colorScale = function (x) {
  const COLOR_SCALE = [
    // negative
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],

    // positive
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38],
  ];
  const i = Math.round(x * 7) + 4;
  if (x < 0) {
    return COLOR_SCALE[i] || COLOR_SCALE[0];
  }
  return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
};

export const hexToRgb = function (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

export const LightenDarkenColor = function (col, amt) {
  if (col[0] === "#") {
    col = col.slice(1);
  }
  var r = col[0] * amt;
  var g = col[1] * amt;
  var b = col[2] * amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return [r, g, b];
};

export function LazyRound(num) {
  var parts = num.split(".");
  return parts.length > 1
    ? Math.round(
        parseInt(parts.join(""), 10) / Math.pow(1000, parts.length - 1)
      ) + ["T", "M", "B"][parts.length - 2]
    : parts[0];
}


/***
 * @param {string} str
 * @returns {number} /* eslint-disable no-bitwise
 * @description This function takes a string and returns a unique number.
 * @example
 * const str = "Hello World";
 * const uniqueNumber = hashString(str);
 * console.log(uniqueNumber); // 1794106052
 */
export function hashString(str: string): number {
  var hash = 0;
  if (str.length === 0) return hash;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
