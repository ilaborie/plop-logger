import colors from "ansi-colors";
import {
  ConsoleAppender,
  defaultConfig,
  LoggerConfiguration
} from "../core/LoggerConfig";
import { LogLevel } from "../core/LoggerLevel";

export class NodeEmojiAppender extends ConsoleAppender {
  constructor(console: Console) {
    super(console);
  }

  formatLevel(level: LogLevel): string {
    switch (level) {
      case LogLevel.Trace:
        return "🐾";
      case LogLevel.Debug:
        return "🐛";
      case LogLevel.Info:
        return "ℹ️ ";
      case LogLevel.Warn:
        return "⚠️ ";
      case LogLevel.Error:
        return "💥";
      default:
        return LogLevel[level];
    }
  }

  formatDate(now: Date): string {
    return [
      now
        .getMinutes()
        .toString()
        .padStart(2, "0"),
      ":",
      now
        .getSeconds()
        .toString()
        .padStart(2, "0"),
      ".",
      now
        .getMilliseconds()
        .toString()
        .padStart(3, "0")
    ].join("");
  }

  formatName(name: string): string {
    return colors.magenta(name);
  }

  formatArg(arg: any | null): string {
    if (arg === null) return "<null>";
    let value: string;
    if (typeof arg === "function") {
      value = arg.apply(null);
    } else if (typeof arg === "object") {
      try {
        value = JSON.stringify(arg);
      } catch (e) {
        value = arg.toString();
      }
    } else {
      value = `${arg}`;
    }
    return colors.cyan(value);
  }

  formatDump(obj: any): string[] {
    let value: string;
    try {
      value = JSON.stringify(obj);
    } catch (e) {
      value = obj.toString();
    }
    return ["🗑 ", colors.yellow(value)];
  }
}

export const colorEmojiConfig: LoggerConfiguration = {
  ...defaultConfig,
  appender: new NodeEmojiAppender(global.console)
};
