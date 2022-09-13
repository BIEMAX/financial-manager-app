import { LogType } from "../models/logs.enum";

export class LogsUtil {
  enableLogs: Boolean = false;

  constructor(EnableLogs: Boolean = false) {
    this.enableLogs = EnableLogs;
  }

  /**
   * Prints a message/log into console.log in web browser.
   * @param LogTypeToPrint Whick type of log will print
   * @param Message Message to print
   */
  printLog (LogTypeToPrint: LogType, Message: String) {
    switch (LogTypeToPrint) {
      case LogType.DEBUG: console.log(Message); break;
      case LogType.INFO: console.info(Message); break;
      case LogType.WARN: console.warn(Message); break;
      case LogType.ERROR: console.error(Message); break;
    }
  }
}