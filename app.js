'use strict'

const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()


app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/index', {
        title: "Levi Olson",
        active: "home",
        content: ""
    })
})

// This is really really inefficient... this should be cached and built during a build.
app.get('/posts', (req, res) => {
    const postDir = __dirname + '/posts'
    let files = fs.readdirSync(postDir, 'utf8')
    let data = {
        title: "Posts - Levi Olson",
        active: "posts",
        posts: []
    }
    for (let i = 0; i < files.length; i++) {
        if (path.extname(files[i]) === '.json') {
            let postData = getData(files[i])
            if (postData) {
                data.posts.push(postData)
            } else {
                console.log(files[i], 'does not have a corresponding "html" file')
            }
        }
    }
    data.posts.sort(function (a, b) {
        console.log(new Date(a.created_at_short), new Date(b.created_at_short));
        var keyA = new Date(a.created_at_short),
            keyB = new Date(b.created_at_short)
        // Compare the 2 dates
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
        return 0
    })

    res.render('pages/posts', data)
})

function getData(file) {
    let postData
    try {
        postData = JSON.parse(fs.readFileSync('./posts/' + file, 'utf8'))
        postData.content = fs.readFileSync('./posts/' + postData.content_file, 'utf8')
    } catch (e) {
        return
    }
    return postData
}

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/pages/about.html')
})

app.get('/uncopyright', (req, res) => {
    return res.sendFile(__dirname + '/views/pages/uncopyright.html')
})

app.get('/404', (req, res) => {
    return res.status(404).render('pages/404', {
        title: "Page Not Found - Levi Olson",
        active: ""
    })
})

app.get('/core.css', (req, res) => {
    res.sendFile(__dirname + '/core.css')
})

app.get('/posts/:post', (req, res) => {
    let post = req.params.post
    let postData
    try {
        postData = JSON.parse(fs.readFileSync('./posts/' + post + '.json', 'utf8'))
        postData.content = fs.readFileSync('./posts/' + postData.content_file, 'utf8')
    } catch (e) {
        return res.redirect('/404')
    }
    return res.render('pages/post', postData)
})

app.get('/bnp/changelog', (req, res) => {
    res.sendFile(__dirname + 'posts/bnp-changelog.html')
})

const port = 3000
app.listen(port, () => console.log('Example app listening on port ' + port + '!'))

module.exports = app
