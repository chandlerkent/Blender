var HexColorNode = require("./HexColorNode").HexColorNode;
var NamedColorNode = require("./NamedColorNode").NamedColorNode;

var ColorNode = exports.ColorNode = function(color) {
    this.color = color;
};

ColorNode.prototype.convert = function(key) {
    if (NamedColorNode.isNamedColor(this.color)) {
        return new NamedColorNode(this.color);
    } else if (HexColorNode.namedColorToHexValue(this.color)) {
        return new HexColorNode(HexColorNode.namedColorToHexValue(this.color));
    } else {
        return this.color;
    }
}