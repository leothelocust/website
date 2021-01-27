SHELL=/bin/bash
COMMAND_COLOR = \033[36m
SELECT_COLOR  = \033[34m
DESC_COLOR    = \033[32m
CLEAR_COLOR   = \033[0m

.PHONY: help
help: ## prints this message ## 
	@echo ""; \
	echo "Usage: make <command>"; \
	echo ""; \
	echo "where <command> is one of the following:"; \
	echo ""; \
	grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	perl -nle '/(.*?): ## (.*?) ## (.*$$)/; if ($$3 eq "") { printf ( "$(COMMAND_COLOR)%-20s$(DESC_COLOR)%s$(CLEAR_COLOR)\n\n", $$1, $$2) } else { printf ( "$(COMMAND_COLOR)%-20s$(DESC_COLOR)%s$(CLEAR_COLOR)\n%-20s%s\n\n", $$1, $$2, " ", $$3) }';

.PHONY: compile
compile: ## convert md files to html ## (uses "showdown.js" in node_modules)
	@echo ""; \
	echo "Select Post to Compile:"; \
	echo -e "$(SELECT_COLOR)"; \
	./select.sh
	
.PHONY: run
run: ## npm run startdev ## 
	@echo "-> Running"
	@npm run startdev

