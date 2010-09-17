var ClassNode = require("./ClassNode").ClassNode;

var Stylesheet = exports.Stylesheet = function(classList) {
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