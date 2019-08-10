import chalk from "chalk";
import { LoggerConfiguration, defaultConfig } from "../core/LoggerConfig";
import { LogLevel } from "../core/LoggerLevel";

export const colorEmojiConfig: LoggerConfiguration = {
  ...defaultConfig,
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
  },
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
  },
  formatName(name: string): string {
    return chalk.magenta(name);
  },
  formatArg(arg: any | null): string {
    if (arg === null) return "";
    let value: string;
    if (typeof arg === "function") {
      value = arg.apply(null);
    } else if (typeof arg === "object") {
      value = JSON.stringify(arg);
    } else {
      value = `${arg}`;
    }
    return chalk.cyan(value);
  },
  formatDump(obj: any): string[] {
    return ["🗑 ", chalk.yellow(JSON.stringify(obj, null, 2))];
  }
};
