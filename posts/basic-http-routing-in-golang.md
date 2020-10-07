# Basic HTTP Routing in Golang #

Golang is incredibly powerful.  Its standard library has so much to offer, but I think other languages have encouraged the use of external libraries for even the most basic tasks.  For example, with JavaScript, most inexperienced developers seem to use jQuery to do simple tasks like selecting an element and replacing its contents. When you and I both know jQuery is way overkill for such a task.  [See my article on Vanilla JS basics](https://leviolson.com/posts/vanilla-js-basics).

I believe that in order to be considered an expert in a language, you must at least be able to demonstrate using the core language to achieve your goal.  In our current case, HTTP routing.  Now to be clear, I don't think you need to write everything from scratch all the time, but you should have a firm grasp on what is available by the core language, and when you are better suited to use an external library.  If you are looking for more advanced HTTP routing, then I would suggest using something like [gin](https://github.com/gin-gonic/gin).

Enough ranting, let's get to it.

## Assumptions ##

I assume you have basic knowledge of the Go language at this point, so if not, it might be worth searching for some entry level basics first.  See [A Tour of Go](https://tour.golang.org).

## Let's begin ##

The accompanying repo for the code produced in this article is located [on github](https://github.com/leothelocust/basic-http-routing-in-golang).

### Step 1 ###

Here is our basic folder structure for this basic http routing example:

<pre class="prettyprint"><code>    basic-http-routing-in-golang/
        main.go
</pre></code>

As a starting point our `main.go` file looks like this:

<pre class="prettyprint"><code class="language-go">    package main

    import (
        "fmt"
        _ "net/http"
    )

    func main() {
        fmt.Println("Hello HTTP")
    }
</pre></code>

### Step 2 ###

Now starting at a very basic level, we can leverage the [`http.HandleFunc`](https://golang.org/pkg/net/http/#HandleFunc) method.

It is very simple to use and its signature is easy to understand.

<pre class="prettyprint"><code class="language-go">    func HandleFunc(pattern string, handler func(ResponseWriter, *Request))
</pre></code>

Which basically means, <code class="prettyprint">http.HandleFunc("/url", routingFunction)</code> where `routingFunction` looks like this:

<pre class="prettyprint"><code class="language-go">    func routingFunction(w http.ResponseWriter, req *http.Request) {
        fmt.Fprint(w, "Hello HTTP")
    }
</pre></code>

With `fmt.Fprint()` we can pass an `http.ResponseWriter` and a message to display.  Our browser will now look like this when we visit the `/url` endpoint.

![Browser Output for Step 2 - Hello HTTP](https://leviolson.com/images/step2-browser-output.png)

Here is what `main.go` looks like at this point:

<pre class="prettyprint"><code class="language-go">    package main

    import (
        "fmt"
        "log"
        "net/http"
    )

    func main() {
        http.HandleFunc("/hello", helloHTTP)
        log.Fatal(http.ListenAndServe(":8080", nil))
    }

    func helloHTTP(w http.ResponseWriter, req *http.Request) {
        fmt.Fprint(w, "Hello HTTP")
    }
</pre></code>

Now we could stop there, as this is a "basic" http routing example, but I think it isn't quite useful as an example yet, until we start to see something slightly more practical.

### Step 3 ###

So let's add a `NotFound` page when we don't match a pattern in `HandleFunc`.  It's as simple as:

<pre class="prettyprint"><code class="language-go">    func notFound(w http.ResponseWriter, req *http.Request) {
        http.NotFound(w, req)
    }
</pre></code>

Here is what `main.go` looks like after that:

<pre class="prettyprint"><code class="language-go">    package main

    import (
        "fmt"
        "log"
        "net/http"
    )

    func main() {
        http.HandleFunc("/hello", helloHTTP)
        http.HandleFunc("/", notFound)
        log.Fatal(http.ListenAndServe(":8080", nil))
    }

    func helloHTTP(w http.ResponseWriter, req *http.Request) {
        fmt.Fprint(w, "Hello HTTP")
    }

    func notFound(w http.ResponseWriter, req *http.Request) {
        http.NotFound(w, req)
    }
</pre></code>

This will match `/hello` and use the `HelloHTTP` method to print "Hello HTTP" to the browser.  Any other URLs will get caught by the `/` pattern and be given the `http.NotFound` response to the browser.

So that works, but I think we can go further.

### Step 4 ###

We need to give ourselves something more specific than the simple contrived `/hello` endpoint above.  So let's assume we are needing to get a user profile.  We will use the url `/user/:id` where `:id` is an identifier used to get the user profile from our persistance layer (i.e. our database).

We'll start by creating a new method for this GET request called `userProfile`:

<pre class="prettyprint"><code class="language-go">    func userProfile(w http.ResponseWriter, req *http.Request) {
        userID := req.URL.Path[len("/user/"):]
        fmt.Fprintf(w, "User Profile: %q", userID)
    }
</pre></code>

Notice that we get the URL from the `req` variable and we treat the string returned from `req.URL.Path` as a byte slice to get everything after the `/user/` in the string.  **Note: this isn't fool proof, `/user/10ok` would get matched here, and we would be assigning `userID` to `"10ok"`.**

Let's add this new route in our `main` function:

<pre class="prettyprint"><code class="language-go">    func main() {
        http.HandleFunc("/hello", helloHTTP)
        http.HandleFunc("/user/", userProfile)
        http.HandleFunc("/", notFound)
        log.Fatal(http.ListenAndServe(":8080", nil))
    }
</pre></code>

_Note: that this pattern `/user/` matches the trailing `/` so that a call to `/user` in the browser would return a `404 Not Found`._

### Step 5 ####

Ok, so we have introduced some pretty severe holes in the security of our new HTTP router.  As mentioned in a note above, treating the `req.URL.Path` as a byte slice and just taking the last half is a terrible idea.  So let's fix this:

<pre class="prettyprint"><code class="language-go">    var validPath = regexp.MustCompile("^/(user)/([0-9]+)$")

    func getID(w http.ResponseWriter, req *http.Request) (string, error) {
        m := validPath.FindStringSubmatch(req.URL.Path)
        if m == nil {
            http.NotFound(w, req)
            return "", errors.New("Invalid ID")
        }
        return m[2], nil // The ID is the second subexpression.
    }
</pre></code>

Now we can use this method in our code:

<pre class="prettyprint"><code class="language-go">    func userProfile(w http.ResponseWriter, req *http.Request) {
        userID, err := getID(w, req)
        if err != nil {
            return
        }
        fmt.Fprintf(w, "User Profile: %q", userID)
    }
</pre></code>

## Conclusion ##

For now, I'm calling this "Basic HTTP Routing in Golang" article finished.  But I do plan to add more to it as time allows.  Additionally, I'd like to create a more advanced article that discusses the ability to respond to not only GET requests, but also POST, PUT, and DELETE HTTP methods.  Look for an "Advanced HTTP routing in Golang" article in the future.  Thanks for reading this far.  I wish you well in your Go endeavors.
