---
title: Javascript quizzes
date: 2012-02-05
updated: 2012-02-05
tags:
- javascript
- quizzes
---
<p>These are the Javascript quizzes I've <a href="https://twitter.com/Peter_Ajtai">Tweeted</a> and put up on
<a href="http://jsfiddle.net/user/pajtai/fiddles/">jsFiddle</a>.
</p>

<noscript>Important functionality on this page relies on Javascript. Please enable it if you want to see the content.</noscript>

<ul id="quizzes">
</ul>

<script type="text/javascript">
(function() {
    var quizEl = document.getElementById("quizzes"),
            i, ii,
            ellie, ellie2, ellie3, tags,
            a,
            quizzes = [
                {"url":"5TZsw","tags":["closures","references"]},
                {"url":"6Shd9","tags":["hoisting"]},
                {"url":"yGmAf","tags":["Date","timeouts","references","scope"]},
                {"url":"Hm8YA","tags":["length","arguments","Function"]},
                {"url":"x6WkV","tags":["inheritance","prototype"]},
                {"url":"PSTja","tags":["typeof","instanceof","constructor"]},
                {"url":"k4PJm","tags":["Booleans","Objects"]},
                {"url":"U5uaS","tags":["logic"]},
                {"url":"YBXhD","tags":["Arrays","length","addition","concatenation"]},
                {"url":"66yrD","tags":["setInterval","setTimeout","chaining"]},
                {"url":"ejGX2","tags":["variable assignment","arguments"]},
                {"url":"fnTpG","tags":["type conversion"]},
                {"url":"eJ5ru","tags":["scope", "this"]},
                {"url":"X2gXf","tags":["globals"]},
                {"url":"Tqrx6","tags":["constructors"]},
            ],
            quizzesLength = quizzes.length,
            quizTagsLength;

    for (i = 0; i < quizzesLength; ++i) {
        ellie = document.createElement('li');
        a  = document.createElement('a');
        a.href = "http://jsfiddle.net/pajtai/" + quizzes[i].url;
        quizEl.appendChild(ellie);
        ellie.appendChild(a);
        a.appendChild(document.createTextNode("Quiz " + (i + 1)));
        ellie2 = document.createElement('ul');
        ellie3 = document.createElement('li');
        ellie2.appendChild(ellie3);
        ellie.appendChild(ellie2);
        tags = [];
        quizTagsLength = quizzes[i].tags.length;
        for (ii = 0; ii < quizTagsLength; ++ii) {
            tags.push(quizzes[i].tags[ii]);
        }
        ellie3.appendChild(document.createTextNode(tags.join(", ")));
    }
}());
</script>
