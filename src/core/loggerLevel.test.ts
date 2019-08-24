import { LogLevel, logLevel } from "./LoggerLevel";

describe("LogLevel", () => {
  test("All < others", () => {
    expect(LogLevel.All).toBeLessThan(LogLevel.Trace);
    expect(LogLevel.All).toBeLessThan(LogLevel.Debug);
    expect(LogLevel.All).toBeLessThan(LogLevel.Info);
    expect(LogLevel.All).toBeLessThan(LogLevel.Warn);
    expect(LogLevel.All).toBeLessThan(LogLevel.Error);
    expect(LogLevel.All).toBeLessThan(LogLevel.None);
  });
  test("Trace < others except All", () => {
    expect(LogLevel.Trace).toBeGreaterThan(LogLevel.All);
    expect(LogLevel.Trace).toBeLessThan(LogLevel.Debug);
    expect(LogLevel.Trace).toBeLessThan(LogLevel.Info);
    expect(LogLevel.Trace).toBeLessThan(LogLevel.Warn);
    expect(LogLevel.Trace).toBeLessThan(LogLevel.Error);
    expect(LogLevel.Trace).toBeLessThan(LogLevel.None);
  });

  test("Trace < Debug < others", () => {
    expect(LogLevel.Debug).toBeGreaterThan(LogLevel.All);
    expect(LogLevel.Debug).toBeGreaterThan(LogLevel.Trace);
    expect(LogLevel.Debug).toBeLessThan(LogLevel.Info);
    expect(LogLevel.Debug).toBeLessThan(LogLevel.Warn);
    expect(LogLevel.Debug).toBeLessThan(LogLevel.Error);
    expect(LogLevel.Debug).toBeLessThan(LogLevel.None);
  });

  test("Trace, Debug < Info < others", () => {
    expect(LogLevel.Info).toBeGreaterThan(LogLevel.All);
    expect(LogLevel.Info).toBeGreaterThan(LogLevel.Trace);
    expect(LogLevel.Info).toBeGreaterThan(LogLevel.Debug);
    expect(LogLevel.Info).toBeLessThan(LogLevel.Warn);
    expect(LogLevel.Info).toBeLessThan(LogLevel.Error);
    expect(LogLevel.Info).toBeLessThan(LogLevel.None);
  });

  test("others < Warn < Error", () => {
    expect(LogLevel.Warn).toBeGreaterThan(LogLevel.All);
    expect(LogLevel.Warn).toBeGreaterThan(LogLevel.Trace);
    expect(LogLevel.Warn).toBeGreaterThan(LogLevel.Debug);
    expect(LogLevel.Warn).toBeGreaterThan(LogLevel.Info);
    expect(LogLevel.Warn).toBeLessThan(LogLevel.Error);
    expect(LogLevel.Warn).toBeLessThan(LogLevel.None);
  });

  test("others < Error except None", () => {
    expect(LogLevel.Error).toBeGreaterThan(LogLevel.All);
    expect(LogLevel.Error).toBeGreaterThan(LogLevel.Trace);
    expect(LogLevel.Error).toBeGreaterThan(LogLevel.Debug);
    expect(LogLevel.Error).toBeGreaterThan(LogLevel.Info);
    expect(LogLevel.Error).toBeGreaterThan(LogLevel.Warn);
    expect(LogLevel.Error).toBeLessThan(LogLevel.None);
  });
});

describe("logLevel", () => {
  test("should retrieve a logger from name", () => {
    [
      LogLevel.All,
      LogLevel.Trace,
      LogLevel.Debug,
      LogLevel.Info,
      LogLevel.Warn,
      LogLevel.Error,
      LogLevel.None
    ].forEach(level => expect(logLevel(LogLevel[level])).toBe(level));
  });

  test("should retrieve a logger from name case insensitive", () => {
    const name = "ERRor";

    const result = logLevel(name);

    expect(result).toBe(LogLevel.Error);
  });

  test("should return null for an unknown level", () => {
    const name = "plop";

    const result = logLevel(name);

    expect(result).toBe(null);
  });
});
