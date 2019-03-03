---
title: Do not stop not thinking negatively
date: 2012-11-23
updated: 2012-11-23
tags:
- logic
- style
---

Have you ever run across a variable called something like `undisable`? It takes some mental lifting to turn it into
`enable`. The conversion from something into its negation is almost like removing a layer of abstraction.

With this in mind, it's usually clearer to write `if something` than it is to write `if not something`. Of course, there
are times you don't have a choice - you have to use `not`. But the other day I ran across a case where I didn't
immediately realize I had a choice. I caught myself staring at something like:

```javascript
if ( ! previouslyCached || ! linked ) {
    methodA();
} else {
    methodB();
}
```

I was looking at this piece of code because a path was dropping into the wrong fork. The two `not`s do not help, and in
this case, the `or` gets in the way too.

Is this clearer?

```javascript
if ( previouslyCached && linked ) {
    methodB();
} else {
    methodA();
}
```

The two code snippets above are logically equivalent. They accomplish the same thing, but I think the second one is much
easier to read.

Removing the `not`s makes it clearer, and in this case, switching to `and` makes it clearer. There are
four cases we are concerned with: one of the variables is true while the other is false (2 possibilities for this one),
both are true, or both are false. With the first `if`, the `or` is capturing three of these possibilities, with the
second snippet - the `and` - we are only capturing one. In this case specificity means clarity. It's easier to imagine
both `previouslyCached` and `linked` being true then it is to imagine the either one or both of the opposites of
`previouslyCached` or `linked` being true. The `else` acts as a natural "catch all" in the second snippet, while it acts
as a strangely specific and narrow filter in the second one.


