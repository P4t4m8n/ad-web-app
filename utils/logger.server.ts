import fs from "fs";

type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

type LogArgument = string | number | boolean | object | Error;

interface LoggerService {
  debug(...args: LogArgument[]): void;
  info(...args: LogArgument[]): void;
  warn(...args: LogArgument[]): void;
  error(...args: LogArgument[]): void;
}

export const loggerService: LoggerService = {
  debug(...args: LogArgument[]): void {
    doLog("DEBUG", ...args);
  },
  info(...args: LogArgument[]): void {
    doLog("INFO", ...args);
  },
  warn(...args: LogArgument[]): void {
    doLog("WARN", ...args);
  },
  error(...args: LogArgument[]): void {
    doLog("ERROR", ...args);
  },
};

const logsDir = "./logs";
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const getTime = (): string => {
  const now = new Date();
  return now.toLocaleString("he");
};

const isError = (err: unknown): err is Error => {
  return err instanceof Error;
};

const stringifyArg = (arg: LogArgument): string => {
  if (typeof arg === "string") return arg;
  if (isError(arg)) return arg.message;
  return JSON.stringify(arg);
};

const doLog = (level: LogLevel, ...args: LogArgument[]): void => {
  const strs = args.map(stringifyArg);
  const line = `${getTime()} - ${level} - ${strs.join(" | ")}\n`;
  fs.appendFile("./logs/backend.log", line, (err) => {
    if (err) console.error("FATAL: cannot write to log file");
  });
};
