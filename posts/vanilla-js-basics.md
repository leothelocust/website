# Vanilla JS Basics #

_Warning: This article turned out to be a bit of rant.  So if you are the type to get offended when I say negative things about JavaScript, you are welcome to leave._

JavaScript is what I consider to be an "easy" language.  Now what do I mean by that?  Well, its usually the first _scripting_ language that new developers learn, and you can get started with very little "training".  It has a relatively simple syntax.  It can be very powerful.  So from my point of view, its an easy language to pick up.  And therein lies the problem.

So many of the JavaScript programmers out there today hear the term "JavaScript" and think in there mind "jQuery".  Now that's great to have that kind of brand recognition if you are jQuery, but if you are looking to be an efficient programmer that doesn't put holes in everything you make, you may want to consider that JavaScript is NOT jQuery.

Additionally, we need to start thinking about the consequences of using third-party libraries for everything.  Longer load times, additional security risks, more memory consumption, and the list goes on.

I want to give you at least a few little snippets of vanilla JavaScript that will get you on your way to not importing jQuery on every project as a _step 1_.  It should be near the end of your steps and only as needed.

_Disclaimer: Vanilla JavaScript will be longer (i.e. more verbose), but this isn't always a bad thing.  Keep in mind that we are eliminating the import of another package, and all the bloat that comes with it._

## Assumptions ##

For starters, I'm assuming that you getting this far means that you at least have heard of JavaScript.  If you have not heard of jQuery, **leave now**, I don't want "introducing someone to jQuery" to be what you get out of this.

Let's begin...

### Selecting Element in the DOM ###

jQuery

        $('#myID')

Vanilla JavaScript

        document.getElementById('myID')

Again, note that vanilla JavaScript is longer, but its actually more descriptive of what is going on here.  Unless you are familiar with jQuery (yes, I know you are) the jQuery syntax doesn't tell you what its doing.

### Replace Text/HTML in the DOM ###

jQuery

        $('#myID').html('here is the replacement')

Vanilla JavaScript

        document.getElementById('myID').innerHTML('here is the replacement')

Very similar eh.  However, there is actually some performance gain by using vanilla JavaScript.  See [here](https://stackoverflow.com/questions/3563107/jquery-html-vs-innerhtml#answer-3563136).

### Click Handling in the DOM ###

jQuery

        $('#myID').click(function() {
            alert('Clicked it!')
        })

Vanilla JavaScript

        document.getElementById('myID').addEventListener('click', function(e) {
            alert('Clicked it!')
        })

So easy.

### Advanced Queries and Iteration ###

jQuery

        $('.item').hide()

Vanilla JavaScript

        var items = document.getElementsByClassName('.items')
        for (var i = 0; i < items.length; i++) {
            item[i].style.display = 'none'
        }

We're starting to see the verbosity I mentioned above, but again, remember that we aren't loading in a massive third-party library!

### Even More Advanced ###

See Patrick Kunka's article [A Year Without jQuery](https://blog.wearecolony.com/a-year-without-jquery/)

Patrick and I agree on many of the same points and his article articulates some helper functions that can be used to perform more advanced loops, child selection and child indexing.  I highly recommend you read through his article.

## Conclusion ##

If you find that your requirements heavily rely on JavaScript for DOM manipulation, or that you need animations such as the ones provided by jQuery, then don't let me stop you.  But if you only need some of what was covered above, or you want to put a priority on performance, then you should really consider going with plain vanilla JavaScript and leave the dependencies behind.  You won't regret it.