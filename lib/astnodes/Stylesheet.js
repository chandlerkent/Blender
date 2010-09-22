var ClassNode = require("./ClassNode").ClassNode;

var Stylesheet = exports.Stylesheet = function(themeName, classList) {
    this.themeName = themeName || "DefaultThemeName";
    this.classList = classList;
};

Stylesheet.prototype.toString = function() {
    return "<< Stylesheet : [ classList : " + this.classList.toString() + " ] >>";
};

Stylesheet.prototype.generate = function(tw) {
    tw.addLine("@import <Foundation/CPObject.j>");
    tw.addLine("@import <AppKit/AppKit.j>");
    var className = this.themeName + "ThemeDescriptor";
    tw.addLine('@import "' + className + '.j"');
    tw.addLines(["", ""]);
    tw.addLine("@implementation " + className + " (CSSTheme)");
    tw.addLine("");
    tw.addLine("+ (CPString)themeName");
    tw.addLine("{");
    tw.addLine('return @"' + this.themeName + '";', 1);
    tw.addLine("}");
    tw.addLine("");
    
    this.classList.forEach(function(cls) {
        cls.generate(tw);
        tw.addLine("");
    });
    
    tw.addLine("@end");
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
        var decls = [];
        var attrs = [];
        for (var i = 0; i < classes.length; i++) {
            decls = decls.concat(classes[i].declarationList);
            attrs = attrs.concat(classes[i].attributeList);
        }
        this.classList.push(new ClassNode(cls, decls, attrs));
    }
};