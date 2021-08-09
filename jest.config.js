module.exports = {
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "setupFiles": [
    "./frontend/src/mocks/localStorage.ts",
    "./frontend/src/mocks/Date.ts"
  ],
  "resolver": "jest-webpack-resolver",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}
