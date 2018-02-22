/** 
 * @module authenticatePatron
 */

/**
 * Authenticates and returns an access token for a patron
 *
 * @param {string} barcode
 * @param {string} password
 * 
 * @returns {promise}
 * 
 * @example myPapi.authenticatePatron('1234567890', 'patron-password')
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
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