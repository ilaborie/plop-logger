import { LogLevel } from "./LoggerLevel";
import { ConsoleAppender, defaultConfig } from "./LoggerConfig";

// findLevel(name: string, defaultLevel: LogLevel): LogLevel;

describe("level", () => {
  const { defaultLevel, levels } = defaultConfig;

  test("defaultLevel is Info", () => {
    expect(defaultLevel).toBe(LogLevel.Info);
  });

  test("levels be empty", () => {
    expect(levels).toEqual({});
  });
});

describe("format", () => {
  const appender = new ConsoleAppender(global.console);

  test("formatLevel", () => {
    const level = LogLevel.Warn;

    const result = appender.formatLevel(level);

    expect(result).toBe("Warn");
  });

  test("formatDate", () => {
    const date = new Date();

    const result = appender.formatDate(date);

    expect(result).toBe(date.toLocaleTimeString());
  });

  test("formatName", () => {
    const name = "plop";

    const result = appender.formatName(name);

    expect(result).toBe(name);
  });

  test("formatMessage", () => {
    const message = "message";

    const result = appender.formatMessage(message);

    expect(result).toBe(message);
  });

  test("formatArg", () => {
    const arg = "arg";

    const result = appender.formatArg(arg);

    expect(result).toBe(arg);
  });

  test("formatArg with null", () => {
    const result = appender.formatArg(null);

    expect(result).toBe("null");
  });

  test("formatDump", () => {
    const result = appender.formatDump([1, 2, { a: "plop" }]);
    const expected = `[
  1,
  2,
  {
    "a": "plop"
  }
]`;

    expect(result).toStrictEqual(["dump", expected]);
  });
});
