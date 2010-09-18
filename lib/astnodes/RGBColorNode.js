var RGBColorNode = exports.RGBColorNode = function(red, green, blue, alpha) {
    this.red = red || 0.0;
    this.blue = blue || 0.0;
    this.green = green || 0.0;
    this.alpha = alpha || 1.0;
};

RGBColorNode.prototype.generate = function(tw) {
    tw.addToCurrentLine('[CPColor colorWithCalibratedRed:' + this.red + ' green:' + this.green + ' blue: ' + this.blue + ' alpha:' + this.alpha + ']');
};

RGBColorNode.prototype.toString = function() {
    return "<< RGBColorNode : [ red : " + this.red + " ], [ green : " + this.green + " ], [ blue : " + this.blue + " ], [ alpha : " + this.alpha + " ] >>";
};