import { colorEmojiConfig } from "./colorEmojiConfig";
import { LogLevel } from "../core/LoggerLevel";

describe("format", () => {
  const {
    formatLevel,
    formatDate,
    formatName,
    formatMessage,
    formatArg,
    formatDump
  } = colorEmojiConfig;

  describe("formatLevel", () => {
    test("trace", () => expect(formatLevel(LogLevel.Trace)).toBe("🐾"));
    test("debug", () => expect(formatLevel(LogLevel.Debug)).toBe("🐛"));
    test("info", () => expect(formatLevel(LogLevel.Info)).toBe("ℹ️ "));
    test("warn", () => expect(formatLevel(LogLevel.Warn)).toBe("⚠️ "));
    test("error", () => expect(formatLevel(LogLevel.Error)).toBe("💥"));
  });

  test("formatDate", () => {
    const date = new Date();
    date.setMinutes(46);
    date.setSeconds(18);
    date.setMilliseconds(7);

    const result = formatDate(date);

    expect(result).toBe("46:18.007");
  });

  test("formatName", () => {
    const name = "plop";

    const result = formatName(name);

    expect(result).toContain(name);
  });

  test("formatMessage", () => {
    const message = "message";

    const result = formatMessage(message);

    expect(result).toContain(message);
  });

  test("formatArg", () => {
    const arg = "arg";

    const result = formatArg(arg);

    expect(result).toContain(arg);
  });

  test("formatArg with a function", () => {
    const arg = (): string => "arg";

    const result = formatArg(arg);

    expect(result).toContain("arg");
  });

  test("formatArg with an object", () => {
    const arg = { name: "arg" };

    const result = formatArg(arg);

    expect(result).toContain("arg");
  });

  test("formatArg with an evil object", () => {
    const arg: any = {};
    arg["self"] = arg;

    const result = formatArg(arg);

    expect(result).toContain("object");
  });

  test("formatArg with null", () => {
    const result = formatArg(null);

    expect(result).toBe("");
  });

  test("formatDump", () => {
    const result = formatDump([1, 2, { a: "plop" }]);

    expect(result.join("")).toContain("plop");
  });

  test("formatDump evil", () => {
    const value: any = {};
    value["self"] = value;
    const result = formatDump(value);

    expect(result.join("")).toContain("object");
  });
});
