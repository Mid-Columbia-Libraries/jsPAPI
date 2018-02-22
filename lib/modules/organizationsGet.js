/** 
 * @module jsPAPI/organizationsGet
 */

/**
 * Returns list of system, library and branch level organizations.
 *
 * @param {string} [type=all] - all|system|library|branch
 * 
 * @returns {promise}
 * 
 * @example myPapi.organizationsGet('branch')
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 * 
 */
module.exports = function(parent) {
    parent.organizationsGet = function(type = 'all') {
        return parent.call('organizations/' + type );
    }
    return parent;
}