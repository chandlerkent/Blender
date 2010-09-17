var Parser = require("jison").Parser;
var File = require("file");

function main() {
    var parser = new Parser(JSON.parse(File.read(File.absolute("lib/grammar.json"))));
    parser.yy.Stylesheet = Stylesheet;
    parser.yy.ClassNode = ClassNode;
    parser.yy.AttributeNode = AttributeNode;
    
    var stylesheet = parser.parse(File.read(File.absolute("tests/theme.css")));
    stylesheet.combineClasses();
    // print(stylesheet);
    var tw = new TextWriter();
    stylesheet.generate(tw);
    print(tw);
}

var Stylesheet = function(classList) {
    this.classList = classList;
};

Stylesheet.prototype.toString = function() {
    return "<< Stylesheet : [ classList : " + this.classList.toString() + " ] >>";
};

Stylesheet.prototype.generate = function(tw) {
    this.classList.forEach(function(cls) {
        cls.generate(tw);
        tw.addLine("");
    });
};

Stylesheet.prototype.combineClasses = function() {
    var classGroups = {};
    for (var i = 0; i < this.classList.length; i++) {
        var cls = this.classList[i];
        if (!classGroups[cls.name])
            classGroups[cls.name] = [];
        classGroups[cls.name].push(cls);
    }
    
    this.classList = [];
    for (var cls in classGroups) {
        var classes = classGroups[cls];
        var attrs = [];
        for (var i = 0; i < classes.length; i++) {
            attrs = attrs.concat(classes[i].attributeList);
        }
        this.classList.push(new ClassNode(cls, attrs));
    }
};

var ClassNode = function(name, attributeList, state) {
    this.name = name;
    this.attributeList = attributeList;
    
    if (state !== undefined) {
        print(state);
        this.attributeList.forEach(function(attr) {
            attr.state = state;
        });
    }
};

ClassNode.prototype.generate = function(tw) {
    var method = [];
    method.push("+ (" + this.cappuccinoName() + ")themed" + this.capitalizedName());
    method.push("{");
    tw.addLines(method, 0);
    
        var bodyPrefix = [];
        bodyPrefix.push("var " + this.name + " = [[" + this.cappuccinoName() + " alloc] initWithFrame:CGRectMake(0.0, 0.0, 0.0, 0.0)];");
        bodyPrefix.push("var themedValues = [");
        tw.addLines(bodyPrefix, 1);
    
            for (var i = 0; i < this.attributeList.length; i++) {
                this.attributeList[i].generate(tw);
            }
    
        var bodySuffix = [];
        bodySuffix.push("];");
        bodySuffix.push("[self registerThemeValues:themedValues forView:" + this.name + "];");
        tw.addLines(bodySuffix, 1);
    
    tw.addLine("}", 0);
};

ClassNode.prototype.capitalizedName = function() {
    return this.name[0].toUpperCase() + this.name.substring(1);
};

ClassNode.prototype.cappuccinoName = function() {
    return "CP" + this.capitalizedName();
};

ClassNode.prototype.toString = function() {
    return "<< ClassNode : [ name : " + this.name + " ], [ attributeList : " + this.attributeList.toString() + " ] >>";
};

var AttributeNode = function(attribute, value) {
    this.attribute = attribute;
    this.value = value;
};

AttributeNode.prototype.generate = function(tw) {
    tw.addLine("[@'" + this.attribute + "', " + this.value + (this.state ? ", " + this.state : "") + "],", 2);
};

AttributeNode.prototype.toString = function() {
    return "<< AttributeNode : [ attribute : " + this.attribute + " ], [ value : " + this.value + " ], [ state : " + this.state + " ] >>";
};

var TextWriter = function() {
    this.text = "";
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
    this.text += prfx + lines.join("\n" + prfx) + "\n";
};

TextWriter.prototype.addLine = function(line, indent) {
    this.text += this.getIndentPrefix(indent || 0) + line + "\n";
};

TextWriter.prototype.toString = function() {
    return this.text;
};

if (require.main === module)
    require("os").exit(main());