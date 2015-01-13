var inherits = require('inherits'),
	_ = require('underscore'),
	EventEmitter = require('events').EventEmitter;

var Object = function () { 
	_.isFunction(this.initialize) && this.initialize(); 
};

inherits(Object, EventEmitter);

Object.extend = require('./common').extend;

module.exports = Object;