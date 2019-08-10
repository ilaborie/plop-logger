import { LogLevel } from "./LoggerLevel";
import { Logger } from "./Logger";

describe("level", () => {
  test("should display all messages with level = Trace", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = new Logger("plop", LogLevel.Trace);

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
    const logger = new Logger("plop", LogLevel.Debug);

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
    const logger = new Logger("plop", LogLevel.Info);

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
    const logger = new Logger("plop", LogLevel.Warn);

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
    const logger = new Logger("plop", LogLevel.Error);

    logger.trace("trace");
    logger.debug("debug");
    logger.info("info");
    logger.warn("warn");
    logger.error("error");

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});

describe("log content", () => {
  test("should display trace message", () => {
    const spy = jest.spyOn(global.console, "log").mockImplementation();
    const logger = new Logger("plop", LogLevel.Trace);

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
    const logger = new Logger("plop", LogLevel.Debug);

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
    const logger = new Logger("plop", LogLevel.Info);

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
    const logger = new Logger("plop", LogLevel.Warn);

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
    const logger = new Logger("plop", LogLevel.Error);

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
    const logger = new Logger("plop");
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
    const logger = new Logger("plop");
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
    const logger = new Logger("plop");

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
