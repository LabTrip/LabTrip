module.exports = {

  rootDir: '',
  displayName: {
    name: 'enzyme-setup',
    color: 'blue'
  },
  runner: 'jest-runner',
  verbose: true,
  errorOnDeprecated: true,
  roots: ['./__tests__/'],

  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(tsx|ts|js)$": "typescript-babel-jest",
    "^.+\\.(ts|tsx|js)$": "ts-jest",
    "^.+\\.(ts|js|jsx)$": "babel-jest",
    "^.+\\.(ts|js|jsx)$": "babel7-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js)?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transformIgnorePatterns: [
    " node_modules / (?! ((jest -)? react-native|react-navigation|@react-navigation/.*)) ",
    "node_modules/(?!(jest-)?react-native)",
    "node_modules/?!(react-navigation)"
  ],


  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires. you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.jest.json"
    }
  }
};