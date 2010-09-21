var ImageNode = exports.ImageNode = function(url, width, height) {
    this.url = url;
    this.width = width;
    this.height = height;
};

ImageNode.prototype.generate = function(tw, appendBrackets) {
    if (appendBrackets)
        tw.addToCurrentLine('[');

    tw.addToCurrentLine('@"' + this.url + '", ' + this.width + ', ' + this.height);

    if (appendBrackets)
        tw.addToCurrentLine(']');
};

ImageNode.prototype.toString = function() {
    return "<< ImageNode : [ url : " + this.url + " ], [ width : " + this.width + " ], [ height : " + this.height + " ] >>";
};