.PHONY: install submodules build test cucumber clean publish

install:
	npm install

submodules:
	git submodule update --init --recursive

build:
	npm run build

test: cucumber

cucumber: install
	npm test

clean:
	npm run clean

publish: build
	npm publish
