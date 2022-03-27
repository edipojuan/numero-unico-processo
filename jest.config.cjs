const config = {
  collectCoverageFrom: [
    "src/**/*.ts",
    '!**/*.config.{cjs,js,ts}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules"
  ],
  coverageReporters: [
    "json",
    "lcov",
    "text"
  ],
  coverageThreshold: {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts)$",
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
  ]
};

module.exports = config;
