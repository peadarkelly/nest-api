module.exports = {
    env: {
      es6: true
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:unicorn/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['tsconfig.eslint.json'],
      sourceType: 'module'
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase',
        }
      ]
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'prefer-arrow',
        'unicorn'
    ],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts'],
          moduleDirectory: ['node_modules', './'],
        }
      }
    }
}
