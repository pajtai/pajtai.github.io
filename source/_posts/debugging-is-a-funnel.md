---
title: Debugging is a funnel
date: 2015-08-14
tags:
- debugging
---

Most bugs are created by one line of code... many by one character. Debugging is
the funnel that starts with your application - sometimes your server / os / or
device - and leads you to that one root cause.

Whenever I end up feeling that I spent too much time trying to isolate a bug,
as I think back on things, it's always because I wasn't constantly narrowing
down where the bug could be coming from.

Thinking of debugging as a funnel can make some difficult bugs seem easy to
solve. For example a colleague, Greg, was writing a VOD (video on demand) app
for Smart TVs. The code worked - showed a browsing page - on the browser, but
loaded on to the TV, the app would crash before showing the screen.

Greg had narrowed the problem down to one of context. `this.private` was not
available on the TV, but it was available on the browser.

In this case, it seemed like the context should be available. The method was
being called directly - `focusFinder.configure()`, and within the `configure`
method, `this.private` was being referenced. It was there on the browser, but
missing on the TV.

Logging out (this TV has no debugger) `this.private` on the TV showed that it
was `undefined`. Maybe `this` was not the right object? Logging out
`Object.keys(focusFinder)` logged out all the correct keys except for the one
we wanted. So the question became: what was different about our key? It was
called `private` and it was the only key whose value was an object and not a
function. Changing the name of the key to `internal` made the app start and is
probably a better if equally broad name. Private is a future reserved keyword
(not yet used for anything but reserved anyway) in JavaScript using strict mode.
The browser and the TV had different implementations for how to handle the
situation.

I feel like the trick here was just getting a handle on the fact that the
correct object was being dealt with but the desired key value pair was missing
from it. It is often tempting to jump to conclusions, and having the incorrect
context is often your first thought when working with JavaScript. The second
trick was realizing that changing the name of the key might accomplish anything.
That is Occam's razor at work.

It can be tempting to jump to conclusions, but since debugging is very similar
to binomial search, and false conclusions can lead you into thousands of lines
of code that have nothing to do with your bug.

In fact binomial search can be an efficient way to find the cause of a probelm
if for code that worked in the past but no longer does. `git bisect` is a great
tool for these type of problems.

Sometimes you have to "bisect" the code you are working on. For example Cooper
was working on figuring out why an LG TV app was running so slow. He had
eliminated many potential causes relating to the running of the code. Finally
he decided to just delete the majority of the elements on the page. The app sped
up. At this point it's a binomial search in the dom, and the culprit turned out
to be an audio tag. Including it in the page slowed down the app.

Often bugs create errors, and the ability to inspect these errors either speeds
up or makes fixing the bug possible. This is why it's so important to know the
location of log files and config files for parts of you system... or to have
some mechanism in place to monitor logging output. For node apps that have good
logging, `pm2 log` is often enough.

Of course if your error is not being logged, things become much more difficult.

