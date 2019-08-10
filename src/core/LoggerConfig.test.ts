import { LogLevel } from "./LoggerLevel";
import { defaultConfig } from "./LoggerConfig";

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
  const {
    formatLevel,
    formatDate,
    formatName,
    formatMessage,
    formatArg
  } = defaultConfig;

  test("formatLevel", () => {
    const level = LogLevel.Warn;

    const result = formatLevel(level);

    expect(result).toBe("Warn");
  });

  test("formatDate", () => {
    const date = new Date();

    const result = formatDate(date);

    expect(result).toBe(date.toLocaleTimeString());
  });

  test("formatName", () => {
    const name = "plop";

    const result = formatName(name);

    expect(result).toBe(name);
  });

  test("formatMessage", () => {
    const message = "message";

    const result = formatMessage(message);

    expect(result).toBe(message);
  });

  test("formatArg", () => {
    const arg = "arg";

    const result = formatArg(arg);

    expect(result).toBe(arg);
  });

  test("formatArg with null", () => {
    const result = formatArg(null);

    expect(result).toBe("");
  });
});
