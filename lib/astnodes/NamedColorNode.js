var NamedColorNode = exports.NamedColorNode = function(color) {
    this.color = color;
};

NamedColorNode.NAMED_COLORS = ["black", "blue", "brown", "clear", "cyan", "darkgray", "gray", "green", "lightgray", "magenta", "orange", "purple", "red", "white", "yellow"];

NamedColorNode.isNamedColor = function(color) {
    return !(NamedColorNode.NAMED_COLORS.indexOf(color) < 0)
};

NamedColorNode.prototype.generate = function(tw) {
    tw.addToCurrentLine('[CPColor ' + this.color + 'Color]');
};

NamedColorNode.prototype.toString = function() {
    return "<< NamedColorNode : [ color : " + this.color + " ] >>";
};