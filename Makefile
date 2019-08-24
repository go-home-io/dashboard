RUN=npm start
BUILD=npm run build
NPM_INSTALL=npm install
NPM_INSTALL_SAVE=$(NPM_INSTALL) --save-dev
ES_LINT=${CURDIR}/node_modules/.bin/eslint --ext .jsx
SERVER=$(GOPATH)/src/go-home.io/x/server

.PHONY: utilities-ci dep lint run build build-to-server

utilities-ci:
	$(NPM_INSTALL) eslint@6.2.0
	$(NPM_INSTALL) eslint-plugin-react@7.11.1
	$(NPM_INSTALL) babel-eslint@10.0.2

dep: utilities-ci
	$(NPM_INSTALL) --package-lock --only=prod

lint:
	$(ES_LINT) "src/**" --fix

lint-no-fix:
	$(ES_LINT) "src/**"

run:
	$(RUN)

build:
	$(BUILD)

git: lint

build-to-server: build
	rm -rf $(SERVER)/public/*
	cp -R build/* $(SERVER)/public/
	@$(MAKE) -f $(SERVER)/Makefile -C $(SERVER) generate-local