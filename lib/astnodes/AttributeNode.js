var AttributeNode = exports.AttributeNode = function(attribute, value) {
    this.attribute = attribute;
    this.value = value;
    this.stateList = [];
};

AttributeNode.prototype.generate = function(tw) {
    tw.addLine('[@"' + this.attribute + '", ', 2);
    if (!this.value.generate)
        tw.addToCurrentLine(this.value);
    else
        this.value.generate(tw);
    tw.addToCurrentLine(((this.stateList.length > 0) ? ", " + this.stateList.join(" | ") : "") + "],");
};

AttributeNode.prototype.toString = function() {
    return "<< AttributeNode : [ attribute : " + this.attribute + " ], [ value : " + this.value + " ], [ state : " + this.state + " ] >>";
};