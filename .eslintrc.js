module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-console": "off",
    "import/newline-after-import": "off",
    "no-unused-vars": "off",
    "func-names": "off",
    "no-use-before-define": "off",
    "no-useless-escape": "off",
    "no-param-reassign": "off"
  }
};
