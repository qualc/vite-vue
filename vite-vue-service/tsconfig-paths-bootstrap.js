const tsconfigPaths = require("tsconfig-paths");

tsconfigPaths.register({
  baseUrl: "./",
  paths: {
    "@/*": ["src/*"],
  },
});
