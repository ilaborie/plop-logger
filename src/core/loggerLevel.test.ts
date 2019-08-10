import { LogLevel } from "./LoggerLevel";

test("Trace < others", () => {
  expect(LogLevel.Trace).toBeLessThan(LogLevel.Debug);
  expect(LogLevel.Trace).toBeLessThan(LogLevel.Info);
  expect(LogLevel.Trace).toBeLessThan(LogLevel.Warn);
  expect(LogLevel.Trace).toBeLessThan(LogLevel.Error);
});

test("Trace < Debug < others", () => {
  expect(LogLevel.Debug).toBeGreaterThan(LogLevel.Trace);
  expect(LogLevel.Debug).toBeLessThan(LogLevel.Info);
  expect(LogLevel.Debug).toBeLessThan(LogLevel.Warn);
  expect(LogLevel.Debug).toBeLessThan(LogLevel.Error);
});

test("Trace, Debug < Info < others", () => {
  expect(LogLevel.Info).toBeGreaterThan(LogLevel.Trace);
  expect(LogLevel.Info).toBeGreaterThan(LogLevel.Debug);
  expect(LogLevel.Info).toBeLessThan(LogLevel.Warn);
  expect(LogLevel.Info).toBeLessThan(LogLevel.Error);
});

test("others < Warn < Error", () => {
  expect(LogLevel.Warn).toBeGreaterThan(LogLevel.Trace);
  expect(LogLevel.Warn).toBeGreaterThan(LogLevel.Debug);
  expect(LogLevel.Warn).toBeGreaterThan(LogLevel.Info);
  expect(LogLevel.Warn).toBeLessThan(LogLevel.Error);
});

test("others < Error", () => {
  expect(LogLevel.Error).toBeGreaterThan(LogLevel.Trace);
  expect(LogLevel.Error).toBeGreaterThan(LogLevel.Debug);
  expect(LogLevel.Error).toBeGreaterThan(LogLevel.Info);
  expect(LogLevel.Error).toBeGreaterThan(LogLevel.Warn);
});
