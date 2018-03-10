var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var jsPAPI = require('./../lib/jsPAPI');

describe('Core Module', function() {
	describe('jsPAPI', function() {
		it('should be a constructor', function() {
			expect(jsPAPI).to.be.a('function');
		})
	});
});

describe('Internal Methods', function() {

	var api = new jsPAPI({ logging: false });

	describe('_init()', function() {
		it('should load core modules', function() {
			expect(api)
				.to.be.an('object')
				.to.have.all.keys(
					'configGet',
					'configSet',
					'call',
					'limitFiltersGet',
					'organizationsGet',
					'authenticatePatron',
					'authenticateStaff',
					'bibGet',
					'bibSearch',
					'bibSearchKW',
					'bibHoldingsGet',
					'collectionsGet'
				);
		});
		it('should store the init time', function() {
			expect(api.configGet('initTime'))
				.to.be.a('string');
			expect(Date.parse(api.configGet('initTime')))
				.to.be.closeTo(Date.now(), 1000);
				
		});
	});

	describe('configSet()', function() {
		it('should save the new config value and return true', function(){
			expect(api.configSet({ scheme: 'https://' })).to.be.true;
		});
		it('should return false if no config provided', function(){
			expect(api.configSet({})).to.be.false;
		});
	});

	describe('configGet()', function() {
		it('should return individual values', function(){
			expect(api.configGet('logging')).to.be.false;
		});
		it('should return null when asked for an invalid param', function(){
			expect(api.configGet('fooBar')).to.be.null;
		});
		it('should return all params when asked', function(){
			expect(api.configGet('all'))
				.to.be.an('object')
				.to.have.all.keys(
					'accessid',
					'key',
					'server',
					'domain',
					'appid',
					'orgid',
					'scheme',
					'path',
					'version',
					'method',
					'auth',
					'authlvl',
					'pass',
					'token',
					'lang',
					'encode',
					'accept',
					'logging',
					'initTime'
				);
		});
	});
});


describe('Public Methods', function() {
	
	var api = new jsPAPI({ logging: false });

	describe('call()', function() {
		it('should return a promise', function() {
			expect(api.call('limitfilters')).to.be.a('promise');
		});
	});
});