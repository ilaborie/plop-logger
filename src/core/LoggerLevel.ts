export enum LogLevel {
  Trace,
  Debug,
  Info,
  Warn,
  Error
}

export interface LoggerLevels {
  [index: string]: string;
}

export function logLevel(s: string): LogLevel | null {
  switch ((s || "").toLowerCase()) {
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
    default:
      return null;
  }
}
