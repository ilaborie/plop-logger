import { NodeColorAppender } from "./colorConfig";
import { LogLevel } from "../core/LoggerLevel";

describe("format", () => {
  const appender = new NodeColorAppender(global.console);

  describe("formatLevel", () => {
    test("trace", () =>
      expect(appender.formatLevel(LogLevel.Trace)).toContain("TRACE"));
    test("debug", () =>
      expect(appender.formatLevel(LogLevel.Debug)).toContain("DEBUG"));
    test("info", () =>
      expect(appender.formatLevel(LogLevel.Info)).toContain("INFO"));
    test("warn", () =>
      expect(appender.formatLevel(LogLevel.Warn)).toContain("WARN"));
    test("error", () =>
      expect(appender.formatLevel(LogLevel.Error)).toContain("ERROR"));
  });

  test("formatDate", () => {
    const date = new Date();
    date.setMinutes(46);
    date.setSeconds(18);
    date.setMilliseconds(7);

    const result = appender.formatDate(date);

    expect(result).toBe("46:18.007");
  });

  test("formatName", () => {
    const name = "plop";

    const result = appender.formatName(name);

    expect(result).toContain(name);
  });

  test("formatMessage", () => {
    const message = "message";

    const result = appender.formatMessage(message);

    expect(result).toContain(message);
  });

  test("formatArg", () => {
    const arg = "arg";

    const result = appender.formatArg(arg);

    expect(result).toContain(arg);
  });

  test("formatArg with a function", () => {
    const arg = (): string => "arg";

    const result = appender.formatArg(arg);

    expect(result).toContain("arg");
  });

  test("formatArg with an object", () => {
    const arg = { name: "arg" };

    const result = appender.formatArg(arg);

    expect(result).toContain("arg");
  });

  test("formatArg with an evil object", () => {
    const arg: any = {};
    arg["self"] = arg;

    const result = appender.formatArg(arg);

    expect(result).toContain("object");
  });

  test("formatArg with null", () => {
    const result = appender.formatArg(null);

    expect(result).toBe("<null>");
  });

  test("formatDump", () => {
    const result = appender.formatDump([1, 2, { a: "plop" }]);

    expect(result.join("")).toContain("plop");
  });

  test("formatDump evil", () => {
    const value: any = {};
    value["self"] = value;
    const result = appender.formatDump(value);

    expect(result.join("")).toContain("object");
  });
});
