#!/bin/bash


for filename in posts/*.md; do
    NEWFILENAME="$(basename "$filename" .md).html"
    ./node_modules/.bin/md2html $filename > "posts/$NEWFILENAME"
done
