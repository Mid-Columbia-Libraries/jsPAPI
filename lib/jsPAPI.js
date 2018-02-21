/** 
 * @module jsPAPI
 */


/*
 * Notes
 * Access Secret - Can be used by staff to emulate user password
 * Access Token - used for staff only requests, must go in URL
 * 
 */

module.exports = function(config = {}, customModules = false) {

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

    // Override defaults if customModules provided
    if(customModules !== false) modules = customModules;

    // Load modules
    modules.forEach(function(file){
        root = require('./modules/' + file)(root);
        if(file.charAt(0) != '_') pub[file] = root[file];
    });

    // Run init setup
    root._init(config);

    // Return public object
    return pub;
};


