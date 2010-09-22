var PatternColorNode = exports.PatternColorNode = function(repeat) {
    this.repeat = repeat;
    this.images = [];
    this.isColor = false;
};

PatternColorNode.prototype.convert = function(key) {
    if (key.toLowerCase().indexOf("color") === -1)
        this.isColor = false;
    else
        this.isColor = true;
    return this;
};

PatternColorNode.prototype.generate = function(tw) {
    if (this.isColor)
        tw.addToCurrentLine('PatternColor(');
    else
        tw.addToCurrentLine('PatternImage(');
    var i = this.images.length;
    var moreThanOne = i > 1;
    if (moreThanOne)
        tw.addToCurrentLine('[');

    while (i--) {
        this.images[i].generate(tw, moreThanOne);
        if (i > 0) {
            tw.addToCurrentLine(', ');
        }
    }

    if (moreThanOne)
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