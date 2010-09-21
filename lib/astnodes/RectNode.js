var RectNode = exports.RectNode = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isInsetRect = false;
};

RectNode.prototype.convert = function(key) {
    if (key.indexOf("inset") !== -1) {
        this.isInsetRect = true;
    }
    return this;
};

RectNode.prototype.generate = function(tw) {
    var rect = [this.x, this.y, this.width, this.height].join(", ");
    if (this.isInsetRect) {
        tw.addToCurrentLine('CGInsetMake(' + rect + ')');
    } else {
        tw.addToCurrentLine('CGRectMake(' + rect + ')');
    }
};

RectNode.prototype.toString = function() {
    return "<< RectNode : [ x : " + this.x + " ], [ y : " + this.y + " ], [ width : " + this.width + " ], [ height : " + this.height + " ] >>";
};