import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ['**/.eslintrc.js', '**/dist', '**/node_modules'],
	},
	...compat.extends('@weather-forecast/eslint-config'),
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},

			ecmaVersion: 5,
			sourceType: 'module',

			parserOptions: {
				project: '/home/alisson/projects/weather-forecast/apps/api/tsconfig.json',
			},
		},

		rules: {
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^node:'],
						['^@nestjs', '^@'],
						['^(@|@weather-app)(/.*|$)'],
						['^\\u0000'],
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
					],
				},
			],
		},
	},
];
