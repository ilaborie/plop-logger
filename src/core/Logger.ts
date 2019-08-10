import { LogLevel } from "./LoggerLevel";

type MessageBuilder = () => string;
type Message = string | MessageBuilder;

export class Logger {
  // Instance
  level: LogLevel;

  // Constructor
  constructor(
    readonly name: string,
    level: LogLevel = LogLevel.Info,
    readonly appender: Console = console
  ) {
    this.level = level;
  }

  trace(message: Message, arg?: any): void {
    this.log(LogLevel.Trace, message, arg);
  }

  debug(message: Message, arg?: any): void {
    this.log(LogLevel.Debug, message, arg);
  }

  info(message: Message, arg?: any): void {
    this.log(LogLevel.Info, message, arg);
  }

  warn(message: Message, arg?: any): void {
    this.log(LogLevel.Warn, message, arg);
  }

  error(message: Message, arg?: any): void {
    this.log(LogLevel.Error, message, arg);
  }

  private log(level: LogLevel, message: Message, arg?: any): void {
    if (this.level <= level) {
      let msg: string;
      if (typeof message === "function") {
        msg = message.apply(null);
      } else {
        msg = `${message}`;
      }
      const formatted = [
        LogLevel[level],
        new Date().toLocaleTimeString(),
        this.name,
        "-",
        msg,
        arg || ""
      ];
      this.appender.log(...formatted);
    }
  }
}
