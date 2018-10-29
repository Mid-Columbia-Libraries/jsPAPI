/** 
 * @module patronAccountGet
 */

/**
 * Retrieves Users Fines and Fees
 *
 * @param {int|string} barcode   - patron barcode/library card #
 * @param {int|string} password  - patron password
 * @param {string} status						   - outstanding|reconciled
 * 
 * @returns {promise}
 * 
 * @example myPapi.patronAccountGet('patronBarcode', 'status')
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 */

module.exports = function(parent) {
    parent.patronAccountGet = function(barcode, password, status = 'outstanding') {
    		console.log(status);
        return parent.call( ('patron/'+ barcode + '/account/' + status),
            { method: 'GET', pass: password, }/*,
            { "Barcode": barcode , "Password": password}*/);
    }
    return parent;
}