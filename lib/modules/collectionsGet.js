/** 
 * @module jsPAPI/collectionsGet
 */

/**
 * Returns a list of collections based on the organization ID. Branches
 * utilize a subset of collection information maintained at the system
 * level in Polaris. To retrieve a list of all collections in the system,
 * pass in an organization ID of 1. To retrieve a list of collections for
 * a specific branch, pass in the branch ID.
 *
 * @param {integer} [id=1] - all|system|library|branch
 * 
 * @returns {promise}
*/
module.exports = function(parent) {
    parent.collectionsGet = function(id = '1') {
        return parent.call('collections', { orgid:id});
    }
    return parent;
}