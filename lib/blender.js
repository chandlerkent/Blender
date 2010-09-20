var Parser = require("jison").Parser;
var File = require("file");
var ASTNodes = require("astnodes/ASTNodes");

var OptionsParser = new (require("narwhal/args").Parser)();
OptionsParser.usage("INPUT_FILE");
OptionsParser.help("Compiles a CSS file to a Cappuccino theme file.");
OptionsParser.helpful();

exports.main = function() {
    var options = OptionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        OptionsParser.printUsage(options);
        return -1;
    }
        
    var parser = new Parser(JSON.parse(File.read(File.join(require.module, "../grammar.json"))));
    parser.yy = ASTNodes;
    
    var stylesheet = parser.parse(File.read(File.absolute(options.args[0])));
    stylesheet.combineClasses();
    
    var tw = new TextWriter();
    stylesheet.generate(tw);
    
    tw.writeToFile(options.args[0])
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

TextWriter.prototype.writeToFile = function(cssFile) {
    var jFile = cssFile.replace(File.extension(cssFile), ".j");
    File.write(jFile, this.toString());
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
    require("os").exit(exports.main());