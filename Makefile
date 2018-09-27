RUN=npm start
BUILD=npm run build
NPM_INSTALL=npm install
NPM_INSTALL_SAVE=$(NPM_INSTALL) --save-dev
ES_LINT=${CURDIR}/node_modules/.bin/eslint --ext .jsx

utilities-ci:
	$(NPM_INSTALL_SAVE) eslint@5.6.0
	$(NPM_INSTALL_SAVE) eslint-plugin-react@7.11.1
	$(NPM_INSTALL_SAVE) babel-eslint@9.0.0

dep:
	$(NPM_INSTALL) --package-lock --only=prod

lint:
	$(ES_LINT) "src/**" --fix

run:
	$(RUN)

build:
	$(BUILD)
