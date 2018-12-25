---
title: 'If it is impossible, it did not happen'
date: 2013-08-07 22:12:32
tags:
- logic
- style
---
If a bug can only be explained by an impossible event, then - almost always - your assumptions
of what happened are wrong, and once in a blue moon, your understanding of the possible is
incomplete.

I was working on a section of code in a large, old, and tangled code base. I passed a method three arguments, but the method only
admitted to receiving two. The code looked something like this:

```javascript
function checkPurchase(item, price, budget) {
    console.log(item + ' - ' + price + ' - ' + budget + ' - ' + arguments.length);
    ...
}

...
checkPurchase("item", "price", "budget");
```

The above always showed:
```
item - price - undefined - 2
```

This looks like some sort of horrible core JavaScript bug where arguments are being lost. Clearly
this is approaching the level of impossible. After hunting around for a while, I realized
the method was being spied on and called through, but only the first two of the arguments were being passed
on, since the legacy code only had two arguments..... the spy had been baked into the code
for some quick testing in an unrelated file and forgotten about.... so somewhere else in the
codebase there was a:

```javascript
var oldCheckPurchase = checkPurchase;
checkPurchase = function(item, price) {
    // Do some checks etc here
    ...
    oldCheckPurchase(item, price);
}
```

So if the only possible solution for your bug is something close to impossible - like JavaScript
randomly dropping the third argument of one specific method - then you probably failed to
consider something much more likely.
