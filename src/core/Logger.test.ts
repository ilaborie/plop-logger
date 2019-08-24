import { LoggerLevels, LogLevel } from "./LoggerLevel";
import { Logger } from "./Logger";
import { defaultConfig } from "./LoggerConfig";

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
    Logger.config = {
      ...defaultConfig,
      levels
    };

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
    Logger.config = {
      ...defaultConfig,
      levels
    };

    const logger = Logger.getLogger(name);

    expect(logger.level).toBe(LogLevel.Debug);
  });
});

describe("level", () => {
  function testLevel(
    level: LogLevel,
    [log, trace, debug, info, warn, error]: boolean[]
  ): void {
    const spyLog = jest.spyOn(global.console, "log").mockImplementation();
    const spyTrace = jest.spyOn(global.console, "trace").mockImplementation();
    const spyDebug = jest.spyOn(global.console, "debug").mockImplementation();
    const spyInfo = jest.spyOn(global.console, "info").mockImplementation();
    const spyWarn = jest.spyOn(global.console, "warn").mockImplementation();
    const spyError = jest.spyOn(global.console, "error").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = level;

    logger.trace("trace");
    logger.debug("debug");
    logger.info("info");
    logger.warn("warn");
    logger.error("error");

    expect(spyLog).toHaveBeenCalledTimes(log ? 1 : 0);
    expect(spyTrace).toHaveBeenCalledTimes(trace ? 1 : 0);
    expect(spyDebug).toHaveBeenCalledTimes(debug ? 1 : 0);
    expect(spyInfo).toHaveBeenCalledTimes(info ? 1 : 0);
    expect(spyWarn).toHaveBeenCalledTimes(warn ? 1 : 0);
    expect(spyError).toHaveBeenCalledTimes(error ? 1 : 0);

    [spyLog, spyTrace, spyDebug, spyInfo, spyWarn, spyError].forEach(spy =>
      spy.mockRestore()
    );
  }

  test("should display all messages with level = Trace", () => {
    testLevel(LogLevel.Trace, [false, true, true, true, true, true]);
  });

  test("should display some messages with level = Debug", () => {
    testLevel(LogLevel.Debug, [false, false, true, true, true, true]);
  });

  test("should display some messages with level = Info", () => {
    testLevel(LogLevel.Info, [false, false, false, true, true, true]);
  });

  test("should display some messages with level = Warn", () => {
    testLevel(LogLevel.Warn, [false, false, false, false, true, true]);
  });

  test("should display some messages with level = Error", () => {
    testLevel(LogLevel.Error, [false, false, false, false, false, true]);
  });
});

describe("log", () => {
  test("should display trace message", () => {
    const spy = jest.spyOn(global.console, "trace").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Trace;

    logger.trace("message");

    expect(spy).toHaveBeenCalledWith(
      "Trace",
      expect.any(String),
      "plop",
      "-",
      "message"
    );
    spy.mockRestore();
  });

  test("should display debug message", () => {
    const spy = jest.spyOn(global.console, "debug").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Debug;

    logger.debug("message");

    expect(spy).toHaveBeenCalledWith(
      "Debug",
      expect.any(String),
      "plop",
      "-",
      "message"
    );
    spy.mockRestore();
  });

  test("should display info message", () => {
    const spy = jest.spyOn(global.console, "info").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;

    logger.info("message");

    expect(spy).toHaveBeenCalledWith(
      "Info",
      expect.any(String),
      "plop",
      "-",
      "message"
    );
    spy.mockRestore();
  });

  test("should display warn message", () => {
    const spy = jest.spyOn(global.console, "warn").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Warn;

    logger.warn("message");

    expect(spy).toHaveBeenCalledWith(
      "Warn",
      expect.any(String),
      "plop",
      "-",
      "message"
    );
    spy.mockRestore();
  });

  test("should display error message", () => {
    const spy = jest.spyOn(global.console, "error").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Error;

    logger.error("message");

    expect(spy).toHaveBeenCalledWith(
      "Error",
      expect.any(String),
      "plop",
      "-",
      "message"
    );
    spy.mockRestore();
  });
});

describe("message", () => {
  test("should eval message builder function when logging", () => {
    const spy = jest.spyOn(global.console, "info").mockImplementation();
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
      "message"
    );
    spy.mockRestore();
  });

  test("should not eval message builder function when not logging", () => {
    const spy = jest.spyOn(global.console, "info").mockImplementation();
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
    const spy = jest.spyOn(global.console, "info").mockImplementation();
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

  test("should display 0", () => {
    const spy = jest.spyOn(global.console, "info").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;

    logger.info("message", 0);

    expect(spy).toHaveBeenCalledWith(
      "Info",
      expect.any(String),
      "plop",
      "-",
      "message",
      "0"
    );
    spy.mockRestore();
  });

  test("should display false", () => {
    const spy = jest.spyOn(global.console, "info").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;

    logger.info("message", false);

    expect(spy).toHaveBeenCalledWith(
      "Info",
      expect.any(String),
      "plop",
      "-",
      "message",
      "false"
    );
    spy.mockRestore();
  });

  test("should display null", () => {
    const spy = jest.spyOn(global.console, "info").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;

    logger.info("message", null);

    expect(spy).toHaveBeenCalledWith(
      "Info",
      expect.any(String),
      "plop",
      "-",
      "message",
      "null"
    );
    spy.mockRestore();
  });

  test("should display ''", () => {
    const spy = jest.spyOn(global.console, "info").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;

    logger.info("message", "");

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
});

describe("dump", () => {
  test("", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = Logger.getLogger("plop");
    logger.level = LogLevel.Info;
    const obj = [1, 2, 3, { a: 42 }];

    logger.dump(obj);

    expect(spy).toHaveBeenCalledWith("dump", JSON.stringify(obj, null, 2));
    spy.mockRestore();
  });
});
