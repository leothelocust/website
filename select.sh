#! /usr/bin/env bash 

PS3="Enter a number: "

OPTIONS=$(ls -1 posts/ | sed -e "s/\..*$//" | uniq | grep -v 'example')
select post in $OPTIONS
do
    echo -e "\033[32m"
    echo "Compiling: $post.html"
    echo -e "\033[33m"
    ./node_modules/showdown/bin/showdown.js makehtml -i posts/$post.md -o posts/$post.html
    echo -e "\033[0m"
    exit 0
done