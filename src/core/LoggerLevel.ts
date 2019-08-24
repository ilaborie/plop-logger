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

type LogFunction = (...parameters: any[]) => void;

export function levelToLogFunction(
  level: LogLevel,
  appender: Console
): LogFunction {
  switch (level) {
    case LogLevel.Trace:
      return appender.trace;
    case LogLevel.Debug:
      return appender.debug;
    case LogLevel.Info:
      return appender.info;
    case LogLevel.Warn:
      return appender.warn;
    case LogLevel.Error:
      return appender.error;
    default:
      return appender.log;
  }
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
