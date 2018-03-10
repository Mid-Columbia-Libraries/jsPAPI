/** 
 * @global
 */

var jsPAPI = function(config = {}, customModules = false) {

    // Define private and public objects
    var root = {};
    var pub = {};

    // Define default module list
    var modules = [
        '_buildSignature',
        '_init',
        '_log',
        '_polarisDate',
        'configGet',
        'configSet',
        'call',
        'limitFiltersGet',
        'organizationsGet',
        'authenticatePatron',
        'authenticateStaff',
        'bibGet',
        'bibSearch',
        'bibSearchKW',
        'bibHoldingsGet',
        'collectionsGet',
    ];

    // Load modules
    modules.forEach(function(file){
        // Load the module
        root = require('./modules/' + file)(root);
        // Add non-private methods to public object
        if(file.charAt(0) != '_') pub[file] = root[file];
    });

    // Load custom modules
    if(customModules !== false) {
        customModules.forEach(function(file){
            // Load the module
            root = require('./custom/' + file)(root);
            // Add non-private methods to public object
            if(file.charAt(0) != '_') pub[file] = root[file];
        });
    }


    // Run init setup
    root._init(config);

    // Return public object
    return pub;
};

module.exports = jsPAPI;