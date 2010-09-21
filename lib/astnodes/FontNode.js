var FontNode = exports.FontNode = function() {
    this.bold = false;
    
    var properties = Array.prototype.slice.call(arguments);
    for (var i = 0; i < properties.length; i++) {
        var prop = properties[i];
        if (!isNaN(prop)) {
            this.size = prop;
        } else if (prop === "bold") {
            this.bold = true;
        } else {
            this.name = prop.join(", ");
        }
    }
};

FontNode.prototype.generate = function(tw) {
    var font = [];
    if (this.bold)
        font.push("Bold");
    if (!this.name)
        font.push("System");
    font.push("Font");
    if (!this.name)
        font.push("OfSize:");
    else {
        font.push("WithName:");
        font.push('@"' + this.name + '"');
        font.push(" size:");
    }
    font.push('@"' + this.size + '"');
    font[0] = font[0][0].toLowerCase() + font[0].substring(1);
    
    tw.addToCurrentLine('[CPFont ' + font.join("") + ']');
};

FontNode.prototype.convert = function(key) {
    if (key.indexOf("font") === -1) {
        return this.size;
    } else {
        return this;
    }
};

FontNode.prototype.toString = function() {
    return "<< FontNode : [ bold : " + this.bold + " ], [ size : " + this.size + " ], [ name : " + this.name + " ] >>";
};