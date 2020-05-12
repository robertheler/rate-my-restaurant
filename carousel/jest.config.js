module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files
  // for which coverage information should be collected
  collectCoverageFrom: ['client/src/**/*.{js,jsx}','server/**/*.{js,jsx}'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx'],

  // The paths to modules that run some code to configure or
  // set up the testing environment before each test
  setupFilesAfterEnv: ['jest-enzyme'],

  // The test environment that will be used for testing
  testEnvironment: 'enzyme',

  // Options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.(js|jsx)'],

  // An array of regexp pattern strings that are matched against all test paths,
  // matched tests are skipped
  // testPathIgnorePatterns: ['\\\\node_modules\\\\'],

  // This option sets the URL for the jsdom environment.
  // It is reflected in properties such as location.href
  testURL: 'http://localhost',

  // An array of regexp pattern strings that are matched against all source file paths,
  // matched files will skip transformation
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],

  transform: { '^.+\\.(js|jsx)?$': 'babel-jest' },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
