/** 
 * @module jsPAPI/authenticatePatron
 */

/**
 * Authenticates and returns an access token for a patron
 *
 * @param {string} barcode
 * @param {string} password
 * 
 * @returns {promise}
*/
module.exports = function(parent) {
    parent.authenticatePatron = function(barcode, password) {
        return parent.call(
            'authenticator/patron',
            { auth: 'public', method: 'POST' },
            { "Barcode": barcode, "Password": password }
        );
    }
    return parent;
}