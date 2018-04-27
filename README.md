# How does this work

_This file is intended to help you remember the thing you made way back then..._

## Instructions

1. Create your html file and put it in `/posts`
2. Then create the meta file for it of the same name but using the ext `.json`.  This file should look like:

        {
            "title": "Something Decent - Levi Olson",
            "permalink": "/posts/something-decent",
            "created_at": "2018-04-27T17:05:19-06:00",
            "created_at_short": "2018-04-27",
            "post_title": "the start of something... decent",
            "active": "posts",
            "content_file": "something-decent.html",
            "categories" : ["misc", "programming", "js", "etc..."]
        }

3. Commit, Push and Pull.

## Pull from Digital Ocean

1. `ssh root@45.55.44.195`
2. `cd /home/forge/leviolson-website`
3. `git pull && npm i`
4. `pm2 restart LeviOlson.com`

