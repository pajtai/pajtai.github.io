---
title: Ease your cache
date: 2013-01-13
tags:
- javascript
- caching
status: publish
type: post
---
## Easing: 4 sentence intro

Easing is how an animation moves from initial state to completion over time. Easing is described by an equation or set of
equations. Using easing will make your animation look more polished and appealing.

[Here](http://easings.net/) are visualization for several easing equations.

## Caching

Easing functions can get pretty complicated. They often include notoriously slow methods like sine or cosine. This
means that you should cache your easing results.

The problem is that if your easing equations are not normalized to one unit of time and one unit of completion, then
this caching will not be useful.

In other words, pass in only a normalized `t`, so that you have the maximum chance of hitting a cached `y`. Basically,
we're drawing a curve, and once we calculate a point on that curve, we want to cache our calculation. If we don't
normalize our easing equation then we must draw many curves, but if we do normalize then we only need one curve, and
so we can store points on that single curve from all our animations that share the same easing function.

Below is an example for easing in and out with a sine function:

```javascript
easeInOutSine = (function () {

    // Our cache in a closure
    var cache = {};

    // The actual easing function returned to the user
    return function(t) {

    // If the value is not in the cache, put it in the cache
    if (! cache[t]) {
       cache[t] = -1/2 * (Math.cos(Math.PI * t) - 1);
    }

    // We return from the cache, knowing our value is there
    return cache[t];
    };
}());
```

[**jsFiddle using the above**](http://jsfiddle.net/pajtai/VX5xK/show/) - ([code](http://jsfiddle.net/pajtai/VX5xK/))

Or, if you are an [underscore](http://underscorejs.org/) fan:

```javascript
// Use underscores built in memoize for caching
easeInOutSine: _.memoize(function(t) {

    return -1/2 * (Math.cos(Math.PI*t) - 1)
})
```

[**jsFiddle using the above**](http://jsfiddle.net/pajtai/8kU85/show/) - ([code](http://jsfiddle.net/pajtai/8kU85/))

This complicates your animation equation, since you have to normalize your time and change intervals, but the
payoff is a smoother animation, since you're doing fewer computations.

The above is better for caching then for example something like:

```javascript
// This is hard to cache, since there's going to be cache entries for each combination of arguments
easeInOutSine: function (startValue, changeInValue, msElapsed, msDuration) {
    return -changeInValue/2 * (Math.cos(Math.PI * msElapsed/msDuration) - 1) + startValue;
},
```

Normalizing your easing equations to improve caching is fine and dandy, but it certainly isn't very user friendly unless
your easing equation or animation engine handles the normalization. Then you can go back to having nice arguments.

The disadvantage of rolling your normalization into your easing equation is that you have to recalculate the change
in value from the start and end value at each tick. Also, it doesn't seem like normalization is a job for an easing
 equation. So, let's put the normalization into the animation engine.

For example, adding normalization to `easeInOutSine` and moving a box around would make something like:

```javascript
// The animation equation with user friendly arguments
// This will take care of normalization before calling the easing equation,
// * tickHook - function that get called on each tick with the updated number
// * startNum - initial value
// * endNum - final value
// * duration - how long animation last in milliseconds
// * callback - (optional) function to call when animation finishes
// * easingEq - (optional) easing equation
    var animate = function (tickHook, startNum, endNum, duration, callback, easingEq) {

        var easingEq = easingEq || easing.easeInOutSine,
            changeInNum = endNum - startNum,
            startTime = new Date().getTime(),

            // The engine that runs the animation
            engine = function () {
                var now = new Date().getTime(),

                    // Calculate the normalized time elapsed for the easing function
                    timeNorm = (now - startTime) / duration,

                    // Calculate the normalized completion from the normalized time
                    // using the easing function
                    completionNorm = easingEq(timeNorm),

                    // "un-normalize" to calculate the new actual number
                    newNum = startNum + completionNorm * changeInNum;

                if (now - startTime > duration) {

                    if (callback) {
                        callback();
                    }
                } else {

                    // Update interested parties with the new number once per tick
                    tickHook(newNum);

                    // Kick off the next tick
                    requestAnimationFrame(engine);
                }
            };

        requestAnimationFrame(engine);
    },
// and the implentation goes here...
```

[**jsFiddle example**](http://jsfiddle.net/pajtai/gAAp2/show) ([code](http://jsfiddle.net/pajtai/gAAp2/))

In fact the caching could probably move out of the easing equation too in order to keep the equation clean. You can
roll your own caching (a.k.a. memoization) function, or you can use something like [**Underscore's memoize**](http://underscorejs.org/#memoize).
