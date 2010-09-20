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
    tw.addLines(["", ""]);
    tw.addLine("@implementation " + this.themeName + "ThemeDescriptor : BKThemeDescriptor");
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
        var attrs = [];
        for (var i = 0; i < classes.length; i++) {
            attrs = attrs.concat(classes[i].attributeList);
        }
        this.classList.push(new ClassNode(cls, attrs));
    }
};