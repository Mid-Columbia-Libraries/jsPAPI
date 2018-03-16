/** 
 * @module call
 */

/**
 * 
 * Send a call to the polaris API
 * 
 * This function does most of the heavy lifting of talking to the API.
 * It will load default values for most things but you can override by passing params
 *
 * @param {string} url              - the endpoint being requested
 * @param {object} [params]         - you can override default options & env settings by passing options in params
 * @param {string} [params.scheme]  - ex: https://
 * @param {string} [params.server]  - ex: polaris.mylibrary.org
 * @param {string} [params.path]    - ex: PAPIService/REST
 * @param {string} [params.version] - ex: v1
 * @param {string} [params.appid]   - ex: 100
 * @param {string} [params.orgid]   - ex: 1
 * @param {string} [params.method]  - ex: GET
 * @param {string} [params.auth]    - ex: public
 * @param {string} [params.authlvl] - ex: public
 * @param {string} [params.pass]    - ex: myPassword
 * @param {string} [params.token]   - Generated Staff Authorization Token | Required for protected methods
 * @param {string} [params.lang]    - ex: 1033
 * @param {string} [params.encode]  - ex: application/json
 * @param {string} [params.accept]  - ex: application/json
 * @param {object} [data]           - required for POST/PUT methods, accepts basically anything Javascript can stringify
 * 
 * @requires axios
 * @requires es6-promise
 * 
 * @returns {promise}               - an Axios Promise
 * 
 * @example

    myPapi.call('bib/979127', { lang: '3082' })
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        };

*/
     
module.exports = function(parent) {
    parent.call = function(endpoint, params = {}, data = false) {
        var axios = require('axios');

        // Get root config
        var config = parent.configGet('all');

        // Override root config with any custom params passed
        for(key in params) {
            if (typeof(params[key] !== 'undefined')) {
                config[key] = params[key];
            }
        }
        console.log(config.encode);
        // Check for preceding /
        if(endpoint.startsWith('/')) return 'Do not include a preceding / in your endpoint.';
        
        // Implode base path pieces
        var url = config.scheme + [ config.server , config.path , config.auth , config.version , config.lang , config.appid , config.orgid]
            .join('/');

        // If calling a protected method, append the authentication token
        if(config.auth == 'protected') {
            if(config.token) url = url + '/' + config.token;
            else if(endpoint.toLowerCase() !== 'authenticator/staff') return 'You must use an access token when calling protected methods.';
        }

        // Append endpoint
        url = url + '/' + endpoint;

        // Generate date and signature elements
        sig = parent._buildSignature(config.method.toUpperCase(), url, config.secret);

        // Build Axios Config
        var xhrCfg = {
            headers: {
                'Content-Type': config.encode,
                'Accept': config.accept,
            },
            method: config.method,
            url: encodeURI(url)
        }

        // If calling a public method with protected flag, append the staff token to header
        if(config.auth !== 'protected' && config.token) xhrCfg.headers['X-PAPI-AccessToken'] = config.token;

        // If calling a protected method or not using patron level auth, Append date & sig to header
        if(config.auth === 'protected' || config.authlvl !== 'patron') {
            xhrCfg.headers.PolarisDate = sig.date;
            xhrCfg.headers.Authorization = sig.sig;
        }

        // If data was provided, encode and include it in the request
        if(data) xhrCfg.data = data;

        console.log(xhrCfg);

        // Call Axios
        return rq = axios(xhrCfg);

    }
    return parent;
}