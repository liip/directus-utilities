export declare enum Level {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARN = "WARN",
    ERROR = "ERROR"
}
export declare const log: (message: string, level: Level) => void;
