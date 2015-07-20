var _ = require('lodash');

function cgClassGenerator() {
	var Foo = null;
	var Parent = null;
	var construct = function() {};
	var methods = {};

	if (arguments.length === 1) {
		if (_.isFunction(arguments[0])) {
			if (_.size(arguments[0].prototype)) {
				Parent = arguments[0];
			} else {
				construct = arguments[0];
			}
		} else if (_.isPlainObject(arguments[0])) {
			methods = arguments[0];
		} else {
			return null;
		}
	} else if (arguments.length === 2) {
		if (_.isFunction(arguments[0]) && _.isPlainObject(arguments[1])) {
			construct = arguments[0];
			methods = arguments[1];
		} else if (_.isPlainObject(arguments[0]) && _.isFunction(arguments[1])) {
			methods = arguments[0];
			Parent = arguments[1];
		} else if (_.isFunction(arguments[0]) && _.isFunction(arguments[1])) {
			construct = arguments[0];
			Parent = arguments[1];
		} else {
			return null;
		}
	} else if (arguments.length === 3) {
		if (_.isFunction(arguments[0]) && _.isPlainObject(arguments[1]) && _.isFunction(arguments[2])) {
			construct = arguments[0];
			methods = arguments[1];
			Parent = arguments[2];
		} else {
			return null;
		}
	} else {
		return null;
	}

	if (Parent === null) {
		Foo = construct;
	} else {
		Foo = function() {
			Foo._super.constructor.apply(this, arguments);
			constructor.apply(this, arguments);
		}
		cgClassExtend(Foo, Parent)
	}

	_.extend(Foo.prototype, methods);

	Foo.getInstance = Foo.newInstance = function() {return new Foo();};

	return Foo;
}

function cgClassExtend(Child, Parent) {
	var Foo = function() {};

    Foo.prototype = Parent.prototype;
    Child.prototype = new Foo();
    Child.prototype.construct = Child;
    Child._super = Parent.prototype;
}

module.exports = cgClassGenerator;
