import { LogLevel, LoggerLevels } from "./LoggerLevel";

export interface LoggerConfiguration {
  // Appender
  appender: Console;

  // Level
  defaultLevel: LogLevel;
  levels: LoggerLevels;

  // Format
  formatLevel(level: LogLevel): string;
  formatDate(now: Date): string;
  formatName(name: string): string;
  formatMessage(message: string): string;
  formatArg(arg: any | null): string;
}

/**
 * The default configuration
 */
export const defaultConfig: LoggerConfiguration = {
  // Appender
  appender: global.console,

  // Level
  defaultLevel: LogLevel.Info,
  levels: {},

  // Format
  formatLevel(level: LogLevel): string {
    return LogLevel[level];
  },
  formatDate(now: Date): string {
    return now.toLocaleTimeString();
  },
  formatName(name: string): string {
    return name;
  },
  formatMessage(message: string): string {
    return message;
  },
  formatArg(arg: any | null): string {
    return arg || "";
  }
};
