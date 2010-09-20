var PatternColorNode = exports.PatternColorNode = function(repeat) {
    this.repeat = repeat;
    this.images = [];
};

PatternColorNode.prototype.generate = function(tw) {
    tw.addToCurrentLine('PatternColor([');
    var i = this.images.length;
    while (i--) {
        this.images[i].generate(tw);
        if (i > 0) {
            tw.addToCurrentLine(', ');
        }
    }
    tw.addToCurrentLine("]");
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