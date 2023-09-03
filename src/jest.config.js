export default {
  testEnvironment: 'jsdom',
  transform: {
      '^.+\\.jsx?$': 'babel-jest', // transpile mjs, mts, js, ts files
  },
};