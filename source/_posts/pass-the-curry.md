---
title: Pass the curry
date: 2013-09-16
tags:
- javascript
- currying
- lambdas
---

_Currying is a functional programming technique that allows you to customize functions. It uses function references to do this._

In programming a definition for currying is pretty easy to come by, but these definitions don't generally communicate
the power of currying to most people.

For example, from [wikipedia's curry page](http://en.wikipedia.org/wiki/Currying) we can read that:

> In mathematics and computer science, currying is the technique of transforming a function that takes multiple
> arguments (or a tuple of arguments) in such a way that it can be called as a chain of functions, each with a single
> argument (partial application). It was originated by Moses Schönfinkel and later re-discovered by Haskell
> Curry. Because of this, some say it would be more correct to name it schönfinkeling.

That doesn't sound very exciting, and unless you're already familiar with currying, it's difficult to see how this
technique can be used in every day JavaScript.

Currying is a way to allow the customization of individual functions. This means it can be used to build a library of
functions for later use and possible attachment to objects unrelated by an inheritance hierarchy.

For example, let's say we have a `greet` function. It takes two arguments: who to greet and what to greet with:

```javascript
function greet(name, greeting) {
    alert(greeting + ', ' + name);
}
```

In certain situations, especially if this function is mixed into objects, you might end up always calling the function
with the same `name` argument.

```javascript
function Alarm(alarmOwner) {
    this.alarmOwner = alarmOwner;
}

// Mixin the greet function
Alarm.prototype.greet = greet;
// Other alarm clock functions
// ...
```

Since the alarm will always be greeting its owner, the `greet` method will always be called as follows:

```javascript
this.greet(this.alarmOwner, greeting);
```

The above is a procedural solution. We're feeding all the data into the function with arguments, and we're not using context.
The problem with it is that it can quickly become difficult to manage multiple such methods with many calls to each method.

A possible object oriented solution is to modify the original `greet` function to use a field:

```javascript
function greet(greeting) {
    alert(greeting + ', ' + this.name);
}
```

The above would work okay with our alarm clock, we could just add `this.name = this.alarmOwner` into the constructor.
The problem with this solution is that it ties the use of the method to the availability of a field. In other words, it
is an object oriented approach, since object are combinations of data and methods. This means that
you have to know to add a `this.name` whenever you want to use `greet()`. This is okay, until you start working with
an object that uses `this.name` for something else. For example let's say you have a CoffeeMaker whose `this.name` is
`Model XTR4302`. When the CoffeMaker greets you in the morning, it should do so with your name, and not its own model
name.

The solution is to put a slight twist on the procedural implementation of `greet(name, greeting)`, we can break the
function into two chained functions. The first call of `greet` will take `name` as an argument, and it will return a
function that has `name` baked into it. This second generated - curried - function can now be called with `greeting`, and
it will always greet `name`.

Specifically:

```javascript
function greet(name) {

    return function(greeting) {
        alert(greeting + ', ' + name);
    }
}
```

This method is powerful because it creates a customized function with the first call. This is the `chain of functions`
that the wikipedia definition of currying refers to. Using currying to build a library of functions, allows the creation
of extremely flexible libraries.

There's no need to limit yourself to a single curry. With currying you can do things like setup default options, and
then pass in specific options to finally return a customized function:

```javascript
// Start building your custom function by calling it with the default options object
function customStuff(defaultOptions) {

    // Continue building your custom function by calling it with your specific options for this case
    return function(options) {

        var config = {};

        _.extend(config, defaultOptions, options);

        // And now you have a customized function with access to the created options / config object, and it can
        // also be called with any number of arguments
        return function(arg1, arg2) {
            // In here we have acces to the final config - a combination of the default and specific options
            if (config.that && config.other) {
                // do stuff with arg1 / arg2
            }
        }
    }
}
```

The above is an example of how to customize a function use a combination of default and actual options objects. It is
very flexible, and the concept of extending default options with the actual options is used in libraris from Grunt to
Backbone.
