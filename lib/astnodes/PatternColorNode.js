var PatternColorNode = exports.PatternColorNode = function(repeat) {
    this.repeat = repeat;
    this.images = [];
};

PatternColorNode.prototype.generate = function(tw) {
    tw.addToCurrentLine('PatternColor(');
    for (var i = 0; i < this.images.length; i++) {
        this.images[i].generate(tw);
        if (i < this.images.length - 1) {
            tw.addToCurrentLine(', ');
        }
    }
    
    switch(this.repeat) {
        case "repeat-x":
            tw.addToCurrentLine(', PatternIsHorizontal');
            break;
        case "repeat-y":
            tw.addToCurrentLine(', PatternIsVertical');
            break;
        default:
            break;
    }
    
    tw.addToCurrentLine(')');
};

PatternColorNode.prototype.addImage = function(img) {
    this.images.push(img);
};

PatternColorNode.prototype.toString = function() {
    return "<< PatternColorNode : [ url : " + this.url + " ], [ width : " + this.width + " ], [ height : " + this.height + " ] >>";
};