const path = require('path');

module.exports = {
  extends: ['@weather-forecast/eslint-config'],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    sourceType: 'module',
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js built-in modules
          ['^node:'],
          ['^@nestjs', '^@'],
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