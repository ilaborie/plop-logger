const { defaultConfig, Logger } = require("plop-logger");


// Create a custom config
// using ISO Date
// every logger named 'service' or 'service.*' should log warnings and errors
// but the logger named 'service.plopper' should log everything
const customConfig = {
  ...defaultConfig,
  levels: {
    service: "warn",
    "service.plopper": "trace" // level is case-insensitive
  },
  formatDate(date) {
    return date.toISOString();
  }
};

// Setting the custom config
Logger.config = customConfig;

// Try it
const logger = Logger.getLogger("plop");
logger.info("test"); // Info 2019-08-10T17:23:19.736Z plop - test

const logger2 = Logger.getLogger("service.test");
logger2.debug("test"); // does not log because of warn level

const logger3 = Logger.getLogger("service.plopper");
logger3.debug("test"); // log because of trace level
