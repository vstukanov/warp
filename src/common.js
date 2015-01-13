var _ = require('underscore'),
	inherits = require('inherits');

exports.extend = function(protoProps, staticProps) {
  var parent = this;
  var child;

  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }

  _.extend(child, parent, staticProps);

  inherits(child, parent);

  if (protoProps) _.extend(child.prototype, protoProps);

  child.__super__ = parent.prototype;

  return child;
};

exports.getCallable = function(method, ctx) {
	if (_.isString(method) && _.isFunction(ctx[method])) {
		method = ctx[method];
	}

	if (_.isFunction(method)) {
		method = _.bind(method, ctx);
	}

	return method;
}
