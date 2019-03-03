---
title: Named curies
date: 2013-12-06
updated: 2013-12-06
tags:
- javascript
- currying
- lambdas
- function calls
- function references
---

One of the challenges of using curries is that the usual implementation of a curry looks like a function call and not a
function reference.

For example:

```javascript
greet('bob');
```

Did the above greet Bob, or did it return a greeting function that is now customized for Bob?

```javascript
function greet(name) {
    return function(greeting) {
        alert(greeting + ', ' + name);
    }
}
```

Of course we can improve our naming:

```javascript
getFunctionReferenceToGreet('bob')
```

The problem with the above is that JavaScript has trained us to expect parentheses to be mean function calls, and
the absence of parentheses to mean function references. The above curry violates this. It is the same reason that reading
codes with many `bind(this)` calls is slow going.

A solution is to make curries conform to the convention. Creating the curry is a function call, and the curry returns a
function reference:

```javascript
createGreetingFor('bob').greet
```

Using the above, you can still scan a file and quickly pick out the function calls and function references without
having to read the function names.

The above would be implemented as follows:

```javascript
function createGreetingFor(name) {
    return {
        greet : function(greeting) {
            alert(greeting + ', ' + name);
        }
    };
}
```

and it could be used like this:

```javascript
// variable assignment
var greet = createGreetingFor('bob').greet;
greet('good evening');

// callback that looks like a callback
goodMorning(createGreetingFor('bob').greet)

function goodMorning(greet) {
    greet('good morning');
}
```


