interface LogEntry {
  level: 'error' | 'warn' | 'info';
  message: string;
  context?: ErrorContext;
  timestamp?: string;
}

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  additionalInfo?: Record<string, unknown>;
  errorCode?: string;
}

class LoggerService {
  private logToConsole(entry: LogEntry) {
    const timestamp = new Date().toISOString();
    console[entry.level](
      `[${timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`,
      entry.context
    );
  }

  error(message: string, context?: ErrorContext) {
    const entry: LogEntry = {
      level: 'error',
      message,
      context,
      timestamp: new Date().toISOString()
    };

    this.logToConsole(entry);
  }

  warn(message: string, context?: ErrorContext) {
    const entry: LogEntry = {
      level: 'warn',
      message,
      context,
      timestamp: new Date().toISOString()
    };

    this.logToConsole(entry);
  }

  info(message: string, context?: ErrorContext) {
    const entry: LogEntry = {
      level: 'info',
      message,
      context,
      timestamp: new Date().toISOString()
    };

    this.logToConsole(entry);
  }
}

const loggerServiceInstance = new LoggerService();

export default loggerServiceInstance;