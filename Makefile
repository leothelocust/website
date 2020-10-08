SHELL := /bin/bash
FILE  := tmp.txt
CAT   := bat

# ifeq (, $(shell which bat))
# 	$(error "No bat in $(PATH), consider installing it")
# 	CAT = cat
# endif


.PHONY : compile run 

compile :
	@ls -1 posts/ | sed -e "s/\..*$$//" | uniq | grep -v 'example'; \
	read -p "Which post? " post; \
	./node_modules/showdown/bin/showdown.js makehtml -i posts/$$post.md -o posts/$$post.html

run :
	@echo "-> Running"
	@npm run startdev