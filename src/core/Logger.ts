import { logLevel, LogLevel } from './LoggerLevel';
import { defaultConfig, LogEntry, LoggerConfiguration } from './LoggerConfig';

export type MessageBuilder = () => string;

export type Message = string | MessageBuilder;

export class Logger {
  /** The logger configuration */
  static config: LoggerConfiguration = defaultConfig;

  private static loggers = new Map<string, Logger>();

  private static findLevel(name: string, defaultLevel: LogLevel): LogLevel {
    const names = name.split('.');
    const aux = (idx: number, acc: LogLevel): LogLevel => {
      if (idx > names.length) {
        return acc;
      }
      const slice = names.slice(0, idx);
      const currentName = slice.join('.');
      const maybeLevel = logLevel(Logger.config.levels[currentName]);
      return aux(idx + 1, maybeLevel == null ? acc : maybeLevel);
    };
    return aux(1, defaultLevel);
  }

  /**
   * Get or create a logger
   * @param name the logger name
   */
  static getLogger(name: string): Logger {
    const result = Logger.loggers.get(name);
    if (result) {
      return result;
    }
    const level = Logger.findLevel(name, Logger.config.defaultLevel);
    const newLogger = new Logger(name, level);
    Logger.loggers.set(name, newLogger);
    return newLogger;
  }

  /** The current level */
  level: LogLevel;

  // Constructor
  private constructor(readonly name: string, level: LogLevel) {
    this.level = level;
  }

  /**
   * Dump an object
   */
  dump(obj: any): void {
    Logger.config.appender.dump(obj);
  }

  /**
   * Log a trace message
   * @param message the message
   * @param arg eventually an argument
   */
  trace(message: Message, arg?: any): void {
    this.log(LogLevel.Trace, message, arg);
  }

  /**
   * Log a debug message
   * @param message the message
   * @param arg eventually an argument
   */
  debug(message: Message, arg?: any): void {
    this.log(LogLevel.Debug, message, arg);
  }

  /**
   * Log an info message
   * @param message the message
   * @param arg eventually an argument
   */
  info(message: Message, arg?: any): void {
    this.log(LogLevel.Info, message, arg);
  }

  /**
   * Log a warn message
   * @param message the message
   * @param arg eventually an argument
   */
  warn(message: Message, arg?: any): void {
    this.log(LogLevel.Warn, message, arg);
  }

  /**
   * Log an error message
   * @param message the message
   * @param arg eventually an argument
   */
  error(message: Message, arg?: any): void {
    this.log(LogLevel.Error, message, arg);
  }

  private log(level: LogLevel, message: Message, arg?: any): void {
    if (this.level <= level) {
      const entry: LogEntry = {
        level,
        now: new Date(),
        name: this.name,
        message: typeof message === 'function' ? message() : `${message}`,
        arg,
      };
      Logger.config.appender.log(entry);
    }
  }
}
