export enum LogLevel {
  All,
  Trace,
  Debug,
  Info,
  Warn,
  Error,
  None
}

export interface LoggerLevels {
  [index: string]: string;
}

export function logLevel(s: string): LogLevel | null {
  switch ((s || "").toLowerCase()) {
    case "all":
      return LogLevel.All;
    case "trace":
      return LogLevel.Trace;
    case "debug":
      return LogLevel.Debug;
    case "info":
      return LogLevel.Info;
    case "warn":
      return LogLevel.Warn;
    case "error":
      return LogLevel.Error;
    case "none":
      return LogLevel.None;
    default:
      return null;
  }
}
