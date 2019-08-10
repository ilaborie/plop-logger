import { defaultConfig, Logger } from "./../src";

// Create a custom config
const customConfig = {
  ...defaultConfig,
  formatDate(date: Date) {
    return date.toISOString();
  }
};

// Setting the custom config
Logger.config = customConfig;

// Try it
const logger = Logger.getLogger("plop");
logger.info("test"); // Info 2019-08-10T17:23:19.736Z plop - test
