import colors from "ansi-colors";
import { LoggerConfiguration, defaultConfig } from "../core/LoggerConfig";
import { LogLevel } from "../core/LoggerLevel";

export const colorConfig: LoggerConfiguration = {
  ...defaultConfig,
  formatLevel(level: LogLevel): string {
    switch (level) {
      case LogLevel.Trace:
        return colors.whiteBright("TRACE");
      case LogLevel.Debug:
        return colors.greenBright("DEBUG");
      case LogLevel.Info:
        return colors.cyan("INFO ");
      case LogLevel.Warn:
        return colors.yellow("WARN ");
      case LogLevel.Error:
        return colors.bgRed.gray.bold("ERROR");
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
    return colors.magenta(name);
  },
  formatArg(arg: any | null): string {
    if (arg === null) return "";
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
  },
  formatDump(obj: any): string[] {
    let value: string;
    try {
      value = JSON.stringify(obj, null, 2);
    } catch (e) {
      value = obj.toString();
    }
    return [colors.symbols.pointer, colors.dim.whiteBright(value)];
  }
};
