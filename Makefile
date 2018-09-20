NPM_INSTALL = npm install
ES_LINT=${CURDIR}/node_modules/.bin/eslint --ext .jsx

utilities-ci: 
	$(NPM_INSTALL) eslint@5.6.0 --save-dev
	$(NPM_INSTALL) eslint-plugin-react@7.11.1 --save-dev

dep: 
	$(NPM_INSTALL) --package-lock --only=prod

lint: 
	$(ES_LINT) "src/**" --fix