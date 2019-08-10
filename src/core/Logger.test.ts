import { LogLevel, LoggerLevels } from "./LoggerLevel";
import { Logger } from "./Logger";
import { LoggerConfiguration, defaultConfig } from "./LoggerConfig";

describe("getLogger", () => {
  test("should be by default at level Info", () => {
    const logger = Logger.getLogger("plop");

    expect(logger.level).toBe(LogLevel.Info);
  });

  test("should be create once", () => {
    const logger1 = Logger.getLogger("plop");
    const logger2 = Logger.getLogger("plop");

    expect(logger1).toBe(logger2);
  });

  test("should find default level", () => {
    const name = "a.b";
    const levels: LoggerLevels = {};
    levels[name] = "warn";
    const config: LoggerConfiguration = {
      ...defaultConfig,
      levels
    };
    Logger.config = config;

    const logger = Logger.getLogger(name);

    expect(logger.level).toBe(LogLevel.Warn);
  });

  test("should inherit default level", () => {
    const name = "a.b.c.d";
    const levels: LoggerLevels = {
      a: "trace",
      "a.b": "debug",
      "a.d": "warn",
      z: "error"
    };
    const config: LoggerConfiguration = {
      ...defaultConfig,
      levels
    };
    Logger.config = config;

    const logger = Logger.getLogger(name);

    expect(logger.level).toBe(LogLevel.Debug);
  });
});

describe("level", () => {
  test("should display all messages with level = Trace", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Trace;

    logger.trace("trace");
    logger.debug("debug");
    logger.info("info");
    logger.warn("warn");
    logger.error("error");

    expect(spy).toHaveBeenCalledTimes(5);
    spy.mockRestore();
  });

  test("should display some messages with level = Debug", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Debug;

    logger.trace("trace");
    logger.debug("debug");
    logger.info("info");
    logger.warn("warn");
    logger.error("error");

    expect(spy).toHaveBeenCalledTimes(4);
    spy.mockRestore();
  });

  test("should display some messages with level = Info", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;

    logger.trace("trace");
    logger.debug("debug");
    logger.info("info");
    logger.warn("warn");
    logger.error("error");

    expect(spy).toHaveBeenCalledTimes(3);
    spy.mockRestore();
  });

  test("should display some messages with level = Warn", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Warn;

    logger.trace("trace");
    logger.debug("debug");
    logger.info("info");
    logger.warn("warn");
    logger.error("error");

    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  test("should display some messages with level = Error", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Error;

    logger.trace("trace");
    logger.debug("debug");
    logger.info("info");
    logger.warn("warn");
    logger.error("error");

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});

describe("log", () => {
  test("should display trace message", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Trace;

    logger.trace("message");

    expect(spy).toHaveBeenCalledWith(
      "Trace",
      expect.any(String),
      "plop",
      "-",
      "message",
      ""
    );
    spy.mockRestore();
  });

  test("should display debug message", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Debug;

    logger.debug("message");

    expect(spy).toHaveBeenCalledWith(
      "Debug",
      expect.any(String),
      "plop",
      "-",
      "message",
      ""
    );
    spy.mockRestore();
  });

  test("should display info message", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;

    logger.info("message");

    expect(spy).toHaveBeenCalledWith(
      "Info",
      expect.any(String),
      "plop",
      "-",
      "message",
      ""
    );
    spy.mockRestore();
  });

  test("should display warn message", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Warn;

    logger.warn("message");

    expect(spy).toHaveBeenCalledWith(
      "Warn",
      expect.any(String),
      "plop",
      "-",
      "message",
      ""
    );
    spy.mockRestore();
  });

  test("should display error message", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Error;

    logger.error("message");

    expect(spy).toHaveBeenCalledWith(
      "Error",
      expect.any(String),
      "plop",
      "-",
      "message",
      ""
    );
    spy.mockRestore();
  });
});

describe("message", () => {
  test("should eval message builder function when logging", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;
    const messageBuilder = jest.fn(() => "message");

    logger.info(messageBuilder);

    expect(messageBuilder).toBeCalled();
    expect(spy).toHaveBeenCalledWith(
      "Info",
      expect.any(String),
      "plop",
      "-",
      "message",
      ""
    );
    spy.mockRestore();
  });

  test("should not eval message builder function when not logging", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;
    const messageBuilder = jest.fn(() => "message");

    logger.debug(messageBuilder);

    expect(messageBuilder).not.toBeCalled();
    expect(spy).not.toBeCalled();
    spy.mockRestore();
  });
});

describe("argument", () => {
  test("should display argument", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;

    logger.info("message", "arg");

    expect(spy).toHaveBeenCalledWith(
      "Info",
      expect.any(String),
      "plop",
      "-",
      "message",
      "arg"
    );
    spy.mockRestore();
  });
});
