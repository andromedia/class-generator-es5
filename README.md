class-generator-es5
============

Module for generating and extending classes. Returning class has static method getInstance for returning new instance

Install
-------
    npm install class-generator-es5

Usage
-------
    var CG = require('class-generator-es5');

    var ParentClass = CG(function() {
      console.log('Log from parent constructor');
    }, {
      foo: function() {
        return 42;
      }  
    });
    
    var ChildClass = CG(function() {
      console.log('Log from child constructor');
    }, {
      getMeaning: function() {
        return {sense: this.foo()};
      }
    }, ParentClass);
    
    var childInstance = new ChildClass();
    console.log(childInstance.getMeaning());
    
    var someInstance = CG({print: console.log}).getInstance();
    someInstance.print('I`m instance!');
