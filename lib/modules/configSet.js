/** 
 * @module jsPAPI.configSet
 */

/**
 * Updates root config with given key:values
 *
 * @param {object} cfg - {{key:value},{key2:value2}}
 * 
 * @example myPapi.configSet( {{lang:'1033'}} );
 * 
 * @example myPapi.configSet( { {lang:'1033'} , {orgid:'6'} } );
 */

module.exports = function(parent) {
    parent.configSet = function(cfg) {

        if(typeof(cfg) == 'object' && Object.keys(cfg).length > 0) {
            // Loop through input params
            for(key in cfg) {
                // Save to root config
                    parent._config[key] = cfg[key];
            }
            return true;
        } else {
            parent._log('Error: Config object had length < 1.', 'error');
            return false;
        }
    }
    return parent;
}