var Parser = require("jison").Parser;
var File = require("file");
var ASTNodes = require("astnodes/ASTNodes");
var TextWriter = require("TextWriter").TextWriter;

var OptionsParser = new (require("narwhal/args").Parser)();
OptionsParser.usage("INPUT_FILE");
OptionsParser.help("Compiles a CSS file to a Cappuccino category of a theme file.");
OptionsParser.option("-t", "theme")
	.def("DefaultThemeName")
	.set()
	.help("Set the theme name. Overrides anything set in CSS file.");
OptionsParser.option("-c", "class")
	.def("ThemeDescriptor")
	.set()
	.help("Set the class name. This will be used to create the category.");
OptionsParser.helpful();

exports.main = function() {
    var options = OptionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        OptionsParser.printHelp(options);
        return -1;
    }
    
    var input = File.absolute(options.args[0]);
        
    var parser = new Parser(JSON.parse(File.read(File.join(require.module, "../grammar.json"))));
    parser.yy = ASTNodes;
    
    print("Parsing [" + input + "]...");
    var stylesheet = parser.parse(File.read(input));
    stylesheet.combineClasses();
    
    print("Converting...");
    var tw = new TextWriter();
    stylesheet.generate(tw, options);
    
    var output = File.absolute(options["class"] + "+" + stylesheet.themeName + ".j");
    print("Writing [" + output + "]...");
    tw.writeToFile(output);
    
    print("[" + input + "] -> [" + output + "]");
    print("Ahhh! Blend Success!");
}

if (require.main === module)
    require("os").exit(exports.main());