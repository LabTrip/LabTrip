module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.(tsx|ts|js)$": "typescript-babel-jest",
    "^.+\\.(ts|tsx|js)$": "ts-jest",
    "^.+\\.(ts|js|jsx)$": "babel-jest",
  },
};