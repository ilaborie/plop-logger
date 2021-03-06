const { LogLevel, Logger } = require("plop-logger");

// Get a logger with the `plop` name
const logger = Logger.getLogger("plop");

// Set level
logger.level = LogLevel.Debug;

// Basic usage
logger.trace("a trace message"); // omitted because level is Debug (> Trace)
logger.debug("a debug message"); // displayed because level is Debug
logger.info("an info message"); // displayed because level is Debug (< Info)
logger.warn("a warn message"); // ...
logger.error("an error message"); // ...

// Avoid string computation
logger.trace(() => `sum: ${1 + 1}`); // computation omitted
logger.info(() => `mult: ${3 * 14}`); // computation done

// Add an argument
logger.info("message to print", "Plop!"); // 'Plop!' is an argument

// Dump an object
const obj = { name: "Plop", value: 42 };

logger.dump(obj);
