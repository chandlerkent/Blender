var ClassNode = exports.ClassNode = function(name, declarationList, attributeList, stateList) {
    this.name = name;
    this.declarationList = declarationList;
    this.attributeList = attributeList;
    
    if (stateList === undefined) {
        this.attributeList = {
            "initializer": "initWithFrame:",
            "parameters": ["CGRectMakeZero()"],
        };
        
        if (attributeList.length > 0)
            this.attributeList["parameters"] = [];

        var that = this;
        attributeList.forEach(function(attr) {
            if (attr.key.toLowerCase() === "param") {
                that.attributeList["parameters"].push(attr.value);
            } else {
                that.attributeList[attr.key] = attr.value;
            }
        });
    }
    
    if (stateList !== undefined) {
        var that = this;
        stateList = stateList.map(function(state) {
            return that.transformState(state);
        });
        this.declarationList.forEach(function(attr) {
            attr.stateList = stateList;
        });
    }
};

ClassNode.prototype.generate = function(tw) {
    var method = [];
    method.push("+ (CPArray)" + this.name + "ThemeValues");
    // method.push("+ (" + this.cappuccinoName() + ")themed" + this.capitalizedName());
    method.push("{");
    tw.addLines(method, 0);
    
        // tw.addLine("var " + this.name + " = [[" + this.cappuccinoName() + " alloc] ", 1);
        // var initializer = this.attributeList["initializer"].split(":");
        // for (var i = 0; i < this.attributeList["parameters"].length; i++) {
        //     initializer[i] += ":" + this.attributeList["parameters"][i];
        //     if (i < this.attributeList["parameters"].length - 1)
        //         initializer[i] += " ";
        // }
        // tw.addToCurrentLine(initializer.join(""));
        // tw.addToCurrentLine("];");
        tw.addLine("var themedValues = [", 1);
    
            for (var i = 0; i < this.declarationList.length; i++) {
                this.declarationList[i].generate(tw);
            }
    
        var bodySuffix = [];
        bodySuffix.push("];");
        // bodySuffix.push("[self registerThemeValues:themedValues forView:" + this.name + "];");
        // bodySuffix.push("return " + this.name + ";");
        bodySuffix.push("return themedValues;");
        tw.addLines(bodySuffix, 1);

    tw.addLine("}", 0);
};

ClassNode.prototype.capitalizedName = function() {
    return this.name[0].toUpperCase() + this.name.substring(1);
};

ClassNode.prototype.transformState = function(state) {
    if (state.indexOf('CP') === 0)
        return state;

    return 'CPThemeState' + state[0].toUpperCase() + state.substring(1);
};

ClassNode.prototype.cappuccinoName = function() {
    return "CP" + this.capitalizedName();
};

ClassNode.prototype.toString = function() {
    return "<< ClassNode : [ name : " + this.name + " ], [ declarationList : " + this.declarationList.toString() + " ] >>";
};