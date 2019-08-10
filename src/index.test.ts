import { LogLevel } from "./index";

describe("LogLevel", () => {
  test("Trace < others", () => {
    expect(LogLevel.Trace < LogLevel.Debug).toBe(true);
    expect(LogLevel.Trace < LogLevel.Info).toBe(true);
    expect(LogLevel.Trace < LogLevel.Warn).toBe(true);
    expect(LogLevel.Trace < LogLevel.Error).toBe(true);
  });

  test("Trace < Debug < others", () => {
    expect(LogLevel.Debug > LogLevel.Trace).toBe(true);
    expect(LogLevel.Debug < LogLevel.Info).toBe(true);
    expect(LogLevel.Debug < LogLevel.Warn).toBe(true);
    expect(LogLevel.Debug < LogLevel.Error).toBe(true);
  });

  test("Trace, Debug < Info < others", () => {
    expect(LogLevel.Info > LogLevel.Trace).toBe(true);
    expect(LogLevel.Info > LogLevel.Debug).toBe(true);
    expect(LogLevel.Info < LogLevel.Warn).toBe(true);
    expect(LogLevel.Info < LogLevel.Error).toBe(true);
  });

  test("others < Warn < Error", () => {
    expect(LogLevel.Warn > LogLevel.Trace).toBe(true);
    expect(LogLevel.Warn > LogLevel.Debug).toBe(true);
    expect(LogLevel.Warn > LogLevel.Info).toBe(true);
    expect(LogLevel.Warn < LogLevel.Error).toBe(true);
  });

  test("others < Error", () => {
    expect(LogLevel.Error > LogLevel.Trace).toBe(true);
    expect(LogLevel.Error > LogLevel.Debug).toBe(true);
    expect(LogLevel.Error > LogLevel.Info).toBe(true);
    expect(LogLevel.Error > LogLevel.Warn).toBe(true);
  });
});
