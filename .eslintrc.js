module.exports = {
  env: {
    node: true,
    commonjs: false,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {},
    overrides: [
      {
        files: ['**/*.test.js'],
        env: {
          jest: true,
        },
      },
    ],
  },
};
