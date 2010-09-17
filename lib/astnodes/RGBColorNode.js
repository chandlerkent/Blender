var RGBColorNode = exports.RGBColorNode = function(color) {
    this.color = color;
};

RGBColorNode.prototype.generate = function(tw) {
    tw.addToCurrentLine('[CPColor colorWithCSSString:@"' + this.color + '"]');
};

RGBColorNode.prototype.toString = function() {
    return "<< RGBColorNode : [ color : " + this.color + " ] >>";
};