.PHONY: install submodules build test cucumber mutation clean publish

install:
	npm install

submodules:
	git submodule update --init --recursive

build:
	npm run build

test: cucumber

cucumber: install
	npm test

mutation: install
	npm run test:mutation

clean:
	npm run clean

publish: build
	npm publish
