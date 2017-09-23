module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true,
    "mocha": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "globals": {
    "__DEV__": false,
    "__PROD__": false,
    "__DEBUG__": false,
    "__COVERAGE__": false,
    "__BASENAME__": false,
    "expect": false,
    "should": false,
    "sinon": false
  },
  "rules": {
    "indent": 0,
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
};
