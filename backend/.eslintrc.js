module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': ['eslint:recommended', 'plugin:unicorn/recommended'],
	'overrides': [],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'never'],
		'eol-last': ['error', 'always'],
		'max-len': ['error', { 'code': 120 }],
		'object-curly-spacing': ['error', 'always'],
		'unicorn/prefer-module': 0,
		'unicorn/no-null': 0,
		'unicorn/prefer-node-protocol': 0,
		'unicorn/prefer-top-level-await': 0
	}
}