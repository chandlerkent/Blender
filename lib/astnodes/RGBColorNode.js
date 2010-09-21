var RGBColorNode = exports.RGBColorNode = function(red, green, blue, alpha) {
    this.red = this.transformToBetween0And1(red);
    this.blue = this.transformToBetween0And1(blue);
    this.green = this.transformToBetween0And1(green);
    this.alpha = this.transformToBetween0And1(alpha);
};

RGBColorNode.prototype.transformToBetween0And1 = function(color) {
    if (color === undefined)
        return 1.0;

    if (color > 1.0)
        color = color + " / 255.0";
    
    return color;
}

RGBColorNode.prototype.generate = function(tw) {
    tw.addToCurrentLine('[CPColor colorWithRed:' + this.red + ' green:' + this.green + ' blue:' + this.blue + ' alpha:' + this.alpha + ']');
};

RGBColorNode.prototype.toString = function() {
    return "<< RGBColorNode : [ red : " + this.red + " ], [ green : " + this.green + " ], [ blue : " + this.blue + " ], [ alpha : " + this.alpha + " ] >>";
};