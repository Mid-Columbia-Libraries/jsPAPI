/** 
 * @module _buildSignature
 */

/**
 * 
 * Build polaris signature for authentication request header
 *
 * @param {string} method - 'get' 'post' etc
 * @param {string} url    - endpoint being requested
 * @param {string} pass   - the user password or staff access secret
 * 
 * @requires crypto-js/hmac-sha1
 * @requires crypto-js/enc-base64
 * 
 * @returns {object} - with structure: { sig : 'generated signature', date: 'A RFC 1123 GMT Date' }
 */


module.exports = function(parent) {
    parent._buildSignature = function(method, url, pass = '') {

        var hmac_sha1 = require('crypto-js/hmac-sha1');
        var enc_base64 = require('crypto-js/enc-base64');

        var date = parent._polarisDate();
    
        var sig = method + url + date + pass;

        return {
            sig: 'PWS ' + parent.configGet('accessid') + ':' + hmac_sha1(sig, parent.configGet('key')).toString(enc_base64),
            date: date
        };
    }
    return parent;
}
