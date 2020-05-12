module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/timeslotquoter.js'],
  collectCoverage: true,
  snapshotSerializers: [
    'enzyme-to-json/serializer'],
  setupFiles: [
    './setupTests.js'],
  verbose: true,
};
