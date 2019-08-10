import { LogLevel, Logger } from "./../src";
import { colorEmojiConfig } from "./../src/extra/colorEmojiConfig";

Logger.config = colorEmojiConfig;

const logger = Logger.getLogger("plop");
logger.level = LogLevel.Trace;

logger.trace("a trace message", "Plop!");
logger.debug("a debug message", "Plop!");
logger.info("a debug message", "Plop!");
logger.warn("a debug message", "Plop!");
logger.error("a debug message", "Plop!");

const obj = { name: "Plop", value: 42 };
logger.dump(obj);
