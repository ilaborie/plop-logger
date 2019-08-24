import { LogLevel, Logger } from "./../src";
import { colorEmojiConfig } from "./../src/extra/colorEmojiConfig";

Logger.config = colorEmojiConfig;

const logger = Logger.getLogger("plop");
logger.level = LogLevel.Trace;

logger.trace("a trace message", "Plop!");
logger.debug("a debug message", "Plop!");
logger.info("an info message", "Plop!");
logger.warn("a warn message", "Plop!");
logger.error("an error message", "Plop!");

const obj = { name: "Plop", value: 42 };
logger.dump(obj);
