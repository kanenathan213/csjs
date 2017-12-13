module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['prettier'],
  rules: {
    semi: ['error', 'never'],
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'no-mixed-operators': 0,
  },
};
