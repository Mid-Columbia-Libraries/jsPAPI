/** 
 * @module jsPAPI/authenticateStaff
 */

/**
 * Authenticates staff credentials
 *
 * @param {string} user - your staff user's username
 * @param {string} pass - your staff user's password
 * @param {string} [domain=config.domain] - hint: your domain is listed when signing into polaris via staff client
 * 
 * @returns {promise}
 * 
 * @example myPapi.authenticateStaff('vance', 'my-password').then(function(response){  });
 */

module.exports = function(parent) {
    parent.authenticateStaff = function(user, pass, domain = parent.configGet('domain')) {
        return parent.call(
            'authenticator/staff',
            { auth: 'protected',method: 'POST' },
            { "Domain": domain, "Username": user, "Password": pass }
        );
    }
    return parent;
}