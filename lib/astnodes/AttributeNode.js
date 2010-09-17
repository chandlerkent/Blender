var AttributeNode = exports.AttributeNode = function(attribute, value) {
    this.attribute = attribute;
    this.value = value;
};

AttributeNode.prototype.generate = function(tw) {
    tw.addLine("[@'" + this.attribute + "', ", 2);
    this.value.generate(tw);
    tw.addToCurrentLine((this.state ? ", " + this.state : "") + "],");
};

AttributeNode.prototype.toString = function() {
    return "<< AttributeNode : [ attribute : " + this.attribute + " ], [ value : " + this.value + " ], [ state : " + this.state + " ] >>";
};