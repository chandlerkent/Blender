var File = require("file");

var TextWriter = exports.TextWriter = function() {
    this.lines = [];
};

TextWriter.prototype.getIndentPrefix = function(indent) {
    var prefix = "";
    for (var i = 0; i < indent; i++) {
        prefix += "\t";
    }
    return prefix;
};

TextWriter.prototype.addLines = function(lines, indent) {
    var prfx = this.getIndentPrefix(indent || 0);
    lines = lines.map(function(line) {
        return [line, prfx];
    });
    this.lines = this.lines.concat(lines);
};

TextWriter.prototype.addLine = function(line, indent) {
    this.lines.push([line, this.getIndentPrefix(indent || 0)]);
};

TextWriter.prototype.addToCurrentLine = function(text) {
    this.lines[this.lines.length - 1][0] += text;
};

TextWriter.prototype.writeToFile = function(file) {
    File.write(file, this.toString());
};

TextWriter.prototype.toString = function() {
    var text = "";
    for (var i = 0; i < this.lines.length; i++) {
        var line = this.lines[i];
        text += line[1] + line[0] + "\n";
    }
    return text;
};