# Vanilla JS Basics #

If you haven't read my post on [vanilla js basics](https://leviolson.com/posts/vanilla-js-basics) now would be a good time to do so.  I compare some of what the code looks like between jQuery and straight up plain old vanilla JavaScript.

In this post, I plan to just continue the discussion on how to use JavaScript in its simplest form; to do things the right way, without bringing in third-party dependencies.


## Immediately-Invoked Function Expression ##

You may have heard of `Self-Invoking` or `Self-Executing Anonymous Function` before, but the expression is more accurately described as an `Immediately-Invoked Function Expression`.  See [MDN web docs](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

Basically, its a JavaScript function, contained in a group that is called immediately.  Here is what it looks like:

        (function() {
                // code with a contained scope here
        })()

### Why tho? ###

The importance of the expression is slightly hinted at above, but cannot be overstated.  SCOPE. SCOPE. SCOPE.

There are countless examples of JavaScript code where `variable scope` can bite us in the bucket if we aren't careful. Don't even get me started about [hoisting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting).

Basically it comes down to this.  Be a good scope-citizen.  Maybe you tend to work alone on projects, so this isn't as big of a deal to you as it is to others.  But many of us work in teams or are writing code that someone else will come in contact with.  For us, the importance of scoping (or namespacing if you will) your custom code is critical.  This means that in one file your colleague could do this:

        (function() {
                var log = console.info
                // tons of junk here

                log("print debug msg or something")
                log("etc...")
        })()

And in your file you could do this:

        (function() {
                var log = console.debug

                log("this is a debug level console message")
                log("and i'm not bothering my colleagues preference on")
                log("using info level logging in his code")
        })()

Granted this is a pretty contrived example, but it makes the point.  Your variables are yours.  SCOPE. SCOPE. SCOPE.

## Conclusion ##

Keep calm. Scope.