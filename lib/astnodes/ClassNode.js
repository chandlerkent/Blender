var ClassNode = exports.ClassNode = function(name, declarationList, stateList) {
    this.name = name;
    this.declarationList = declarationList;
    
    if (stateList !== undefined) {
        var that = this;
        stateList = stateList.map(function(state) {
            return that.transformState(state);
        });
        this.declarationList.forEach(function(decl) {
            decl.stateList = stateList;
        });
    }
};

ClassNode.prototype.generate = function(tw) {
    var method = [];
    method.push("+ (CPArray)" + this.name + "ThemeValues");
    method.push("{");
    tw.addLines(method, 0);
  
        tw.addLine("var themedValues = [", 1);
    
            for (var i = 0; i < this.declarationList.length; i++) {
                this.declarationList[i].generate(tw);
            }
    
        var bodySuffix = [];
        bodySuffix.push("];");
        bodySuffix.push("return themedValues;");
        tw.addLines(bodySuffix, 1);

    tw.addLine("}", 0);
};

ClassNode.prototype.transformState = function(state) {
    if (state.indexOf('CP') === 0)
        return state;

    return 'CPThemeState' + state[0].toUpperCase() + state.substring(1);
};

ClassNode.prototype.cappuccinoName = function() {
    return "CP" + this.capitalizedName();
};

ClassNode.prototype.capitalizedName = function() {
    return this.name[0].toUpperCase() + this.name.substring(1);
};

ClassNode.prototype.toString = function() {
    return "<< ClassNode : [ name : " + this.name + " ], [ declarationList : " + this.declarationList.toString() + " ] >>";
};