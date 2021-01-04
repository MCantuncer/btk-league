module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testRegex: 'tests/*/.*.(test|spec)\\.[jt]s?$',
  cacheDirectory: '.jest/cache',
  coverageReporters: ['text', 'cobertura'],
  reporters: ['default', 'jest-junit'],
  collectCoverageFrom: ['**/src/**/*.ts'],
  forceExit: true,
};
