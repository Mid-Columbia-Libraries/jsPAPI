/** 
 * @module bibGet
 */

/**
 * Authenticates staff credentials
 *
 * @param {integer} id - The bibligraphic ID you want to load
 * 
 * @returns {promise}
 * 
 * @example myPapi.bibGet('1314713')
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 */

module.exports = function(parent) {
    parent.bibGet = function(id) {
        return parent.call(
            'bib/' +id
        );
    }
    return parent;
}