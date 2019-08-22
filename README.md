[![pipeline status](https://gitlab.com/olson.levi/website/badges/master/pipeline.svg)](https://gitlab.com/olson.levi/website/commits/master)
[![coverage report](https://gitlab.com/olson.levi/website/badges/master/coverage.svg)](https://gitlab.com/olson.levi/website/commits/master)
[![License: Unlicense](https://img.shields.io/badge/license-unlicense-brightgreen.svg)](http://unlicense.org/)
[![status stable](https://img.shields.io/badge/status-stable-brightgreen.svg)](https://leviolson.com/)

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

1. SSH into server `ssh root@206.189.236.142`
2. Enter correct dir `cd /opt/apps/leviolson.com`
3. Pull in changes `git pull && npm i`
4. Restart the service `pm2 restart LeviOlson.com`
5. Verify it restarted correctly `pm2 logs LeviOlson.com`
