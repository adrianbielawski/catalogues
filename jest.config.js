module.exports = {
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'jest-environment-jsdom-global',
    testURL: 'http://localhost',
    modulePaths: ['<rootDir>/src/'],
    roots: ['<rootDir>/src'],
    setupFiles: ['<rootDir>/test.setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      '\\.(css|scss)$': '<rootDir>/reflectingModuleMock.js',
      '^src/(.*)$':  '<rootDir>/src/$1',
    }, 
  };