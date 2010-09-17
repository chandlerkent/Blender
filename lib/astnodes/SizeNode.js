var SizeNode = exports.SizeNode = function(width, height) {
    this.width = width;
    this.height = height;
};

SizeNode.prototype.generate = function(tw) {
    var rect = [this.width, this.height].join(", ");
    tw.addToCurrentLine('CGSizeMake(' + rect + ')');
};

SizeNode.prototype.toString = function() {
    return "<< SizeNode : [ width : " + this.width + " ], [ height : " + this.height + " ] >>";
};