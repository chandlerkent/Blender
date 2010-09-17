var Parser = require("jison").Parser;
var File = require("file");
var ASTNodes = require("astnodes/ASTNodes");

function main() {
    var parser = new Parser(JSON.parse(File.read(File.absolute("lib/grammar.json"))));
    parser.yy = ASTNodes;
    
    var stylesheet = parser.parse(File.read(File.absolute("tests/theme.css")));
    stylesheet.combineClasses();
    // print(stylesheet);
    var tw = new TextWriter();
    stylesheet.generate(tw);
    print(tw);
}

var TextWriter = function() {
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

TextWriter.prototype.toString = function() {
    var text = "";
    for (var i = 0; i < this.lines.length; i++) {
        var line = this.lines[i];
        text += line[1] + line[0] + "\n";
    }
    return text;
};

if (require.main === module)
    require("os").exit(main());