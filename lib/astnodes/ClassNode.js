var ClassNode = exports.ClassNode = function(name, attributeList, state) {
    this.name = name;
    this.attributeList = attributeList;
    
    if (state !== undefined) {
        state = this.transformState(state);
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

ClassNode.prototype.transformState = function(state) {
    if (state.indexOf('CPThemeState') !== 0)
        state = 'CPThemeState' + state[0].toUpperCase() + state.substring(1);
    return state;
};

ClassNode.prototype.cappuccinoName = function() {
    return "CP" + this.capitalizedName();
};

ClassNode.prototype.toString = function() {
    return "<< ClassNode : [ name : " + this.name + " ], [ attributeList : " + this.attributeList.toString() + " ] >>";
};