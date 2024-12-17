const path = require('path');

module.exports = {
	extends: ['@weather-forecast/eslint-config'],
	parserOptions: {
		project: path.resolve(__dirname, './tsconfig.app.json'),
		sourceType: 'module',
	},
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules'],
	rules: {
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^react', '^@'],
					// Internal packages
					['^(@|@weather-app)(/.*|$)'],
					// Side effect imports
					['^\\u0000'],
					// Parent imports
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],
					// Other relative imports
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				],
			},
		],
	},
};
