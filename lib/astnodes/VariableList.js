var VariableList = exports.VariableList = {};

VariableList.setVariable = function(variable) {
    VariableList[variable.attribute] = variable.value;
};

VariableList.getValue = function(varName) {
    if (!VariableList[varName])
        throw("No variable named " + varName + ".");
        
    return VariableList[varName];
};