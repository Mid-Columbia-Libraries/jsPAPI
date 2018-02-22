/** 
 * @module jsPAPI/call
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
 * @param {string} [params.pass]    - ex: myPassword
 * @param {string} [params.token]   - Generated Staff Authorization Token
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
        var Promise = require('es6-promise').Promise;

        // Get root config
        var config = parent.configGet('all');

        // Check for input params, otherwise use defaults
        for(key in config) {
            params[key] = typeof(params[key] === 'undefined') ? config[key] : params[key];
        }
        
        // Implode base path pieces
        var url = params.scheme + [ params.server , params.path , params.auth , params.version , params.lang , params.appid , params.orgid]
            .join('/');

        // If calling a protected method, append the authentication token
        if(params.auth == 'protected') {
            if(params.token) {
                url = url + '/' + params.token;
            }
        }

        // Append endpoint
        url = url + '/' + endpoint;

        // Generate date and signature elements
        sig = parent._buildSignature(params.method.toUpperCase(), url, params.token);

        // Build Axios Config
        var cfg = {
            headers: {
                'Content-Type': params.encode,
                'Accept': params.accept,
                'PolarisDate': sig.date,
                'Authorization': sig.sig,
            },
            method: params.method,
            url: encodeURI(url)
        }

        // If data was provided, encode and include it in the request
        if(data) cfg.data = data;

        // Call Axios
        return rq = axios(cfg);

    }
    return parent;
}