.PHONY: install submodules build test cucumber-test mutation-test result-page clean publish

WITH_CODE_COVERAGE ?= false
ONLY_DELTA ?= false
DELTA_BASE ?=

install:
	npm install

submodules:
	git submodule update --init --recursive

build: install
	npm run build

# Runs the cross-platform Cucumber/Gherkin conformance suite (specs/features) via cucumber-js
# and normalizes the results into tmp/result/cucumber-test.json (+ coverage-test.json when
# WITH_CODE_COVERAGE=true), keeping the native HTML report(s) under tmp/report/.
test: cucumber-test

cucumber-test: install
	WITH_CODE_COVERAGE=$(WITH_CODE_COVERAGE) scripts/cucumber-test.sh

# Runs StrykerJS mutation testing against the library, using the Cucumber/Gherkin
# conformance suite as the test project, and normalizes the results into
# tmp/result/mutation-test.json. ONLY_DELTA=true only mutates code changed since
# DELTA_BASE (a git ref); it also requires DELTA_BASE to be set.
mutation-test: install
	ONLY_DELTA=$(ONLY_DELTA) DELTA_BASE=$(DELTA_BASE) scripts/mutation-test.sh

# Assembles public/ (the GitHub Pages site) from tmp/result/*.json + tmp/report/* -
# run cucumber-test and mutation-test first to populate tmp/.
result-page:
	scripts/result-page.sh

clean:
	npm run clean
	rm -rf tmp/result tmp/report public

publish: build
	npm publish
