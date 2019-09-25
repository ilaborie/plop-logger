import { LoggerLevels, LogLevel } from "./LoggerLevel";

export interface LogEntry {
  level: LogLevel;
  now: Date;
  name: string;
  message: string;
  arg: any | null;
}

export interface LoggerAppender {
  log(entry: LogEntry): void;

  dump(obj: any): void;
}

type LogFunction = (...parameters: any[]) => void;

export class ConsoleAppender implements LoggerAppender {
  constructor(private console: Console) {}

  // Format
  formatLevel(level: LogLevel): string {
    return LogLevel[level];
  }

  formatDate(now: Date): string {
    return now.toLocaleTimeString();
  }

  formatName(name: string): string {
    return name;
  }

  formatMessage(message: string): string {
    return message;
  }

  formatArg(arg: any | null): string {
    return "" + arg;
  }

  formatDump(obj: any): string[] {
    return ["dump", JSON.stringify(obj, null, 2)];
  }

  log(entry: LogEntry): void {
    const formatted = [
      this.formatLevel(entry.level),
      this.formatDate(entry.now),
      this.formatName(entry.name),
      "-",
      this.formatMessage(entry.message)
    ];
    if (typeof entry.arg !== "undefined") {
      formatted.push(this.formatArg(entry.arg));
    }
    const logFunction = ConsoleAppender.levelToLogFunction(
      entry.level,
      this.console
    );
    logFunction(...formatted);
  }

  dump(obj: any): void {
    const formatted = this.formatDump(obj);
    this.console.log(...formatted);
  }

  private static levelToLogFunction(
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
}

export interface LoggerConfiguration {
  appender: LoggerAppender;
  defaultLevel: LogLevel;
  levels: LoggerLevels;
}

/**
 * The default configuration
 */
export const defaultConfig: LoggerConfiguration = {
  appender: new ConsoleAppender(global.console),
  defaultLevel: LogLevel.Info,
  levels: {}
};
