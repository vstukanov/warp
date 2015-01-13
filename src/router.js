var Object = require('./object'),
	crossroads = require('crossroads'),
	hasher = require('hasher'),
	getCallable = require('./common').getCallable,
	_ = require('underscore');

var Router = module.exports = Object.extend({

	bootstrap: function(method) {
		this._bootstraps || (this._bootstraps = []);
		this._bootstraps.push(getCallable(method, this));
	},

	constructor: function(props) {
		Object.call(this);

		if (!this.routes) {
			return;
		}

		_.each(this.routes, function(method, route) {
			method = getCallable(method, this);

			crossroads.addRoute(route, _.bind(function() {
				var context = {};

				this.ctx.emit('route:before');

				var que = Promise.resolve(context);

				_.each(this.ctx._bootstraps, function(loader) {
					que = que.then(loader);
				});

				que.then(_.bind(function(ctx) {
						this.fn(ctx);
						return ctx;
					}, this))
					.then(_.bind(function(ctx) {
						this.emit('route:after', [ctx]);
					}, this.ctx));

			}, { ctx: this, fn: method }));

		}, this);
	},

	navigate: function(path, options) {
		options = options || {};
		_.extend({}, options, { replace: true, trigger: true });

		var method = options.replace ? 'setHash' : 'replaceHash';

		if (!options.trigger) {
			hasher.changed.active = false;
		}

		hasher[method](path);

		if (!options.trigger) {
			hasher.changed.active = true;
		}
	}
});