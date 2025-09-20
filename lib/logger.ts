// Simple logging system
// In production, use a proper logging service like Winston, Pino, or Sentry

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  error?: Error
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isProduction = process.env.NODE_ENV === 'production'

  private formatMessage(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    }
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): void {
    const logEntry = this.formatMessage(level, message, context, error)

    // Console output for development
    if (this.isDevelopment) {
      const consoleMethod = level === LogLevel.ERROR ? 'error' : 
                           level === LogLevel.WARN ? 'warn' : 
                           level === LogLevel.INFO ? 'info' : 'log'
      
      console[consoleMethod](`[${logEntry.timestamp}] ${level.toUpperCase()}: ${message}`, {
        context: logEntry.context,
        error: logEntry.error,
      })
    }

    // In production, you would send logs to a logging service
    if (this.isProduction) {
      this.sendToLoggingService(logEntry)
    }
  }

  private sendToLoggingService(logEntry: LogEntry): void {
    // Example: Send to external logging service
    // In a real application, you would integrate with services like:
    // - Sentry for error tracking
    // - LogRocket for session replay
    // - DataDog for monitoring
    // - CloudWatch for AWS
    // - Google Cloud Logging for GCP
    
    // For now, we'll just store in memory or send to a simple endpoint
    if (logEntry.level === LogLevel.ERROR) {
      // Send critical errors to monitoring service
      this.sendCriticalError(logEntry)
    }
  }

  private sendCriticalError(logEntry: LogEntry): void {
    // Example implementation for critical error reporting
    if (process.env.ERROR_REPORTING_URL) {
      fetch(process.env.ERROR_REPORTING_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logEntry),
      }).catch(err => {
        console.error('Failed to send error report:', err)
      })
    }
  }

  error(message: string, context?: Record<string, any>, error?: Error): void {
    this.log(LogLevel.ERROR, message, context, error)
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context)
  }

  info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context)
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context)
  }

  // Specialized logging methods
  apiRequest(method: string, url: string, statusCode: number, duration: number, context?: Record<string, any>): void {
    this.info(`API ${method} ${url} - ${statusCode} (${duration}ms)`, {
      method,
      url,
      statusCode,
      duration,
      ...context,
    })
  }

  userAction(userId: string, action: string, context?: Record<string, any>): void {
    this.info(`User action: ${action}`, {
      userId,
      action,
      ...context,
    })
  }

  databaseQuery(query: string, duration: number, context?: Record<string, any>): void {
    this.debug(`Database query executed in ${duration}ms`, {
      query: query.substring(0, 100) + '...', // Truncate long queries
      duration,
      ...context,
    })
  }

  authenticationEvent(event: string, userId?: string, context?: Record<string, any>): void {
    this.info(`Authentication: ${event}`, {
      userId,
      event,
      ...context,
    })
  }

  businessEvent(event: string, context?: Record<string, any>): void {
    this.info(`Business event: ${event}`, context)
  }
}

// Export singleton instance
export const logger = new Logger()

// Helper functions for common logging patterns
export const logError = (message: string, error?: Error, context?: Record<string, any>) => {
  logger.error(message, context, error)
}

export const logApiRequest = (method: string, url: string, statusCode: number, duration: number, context?: Record<string, any>) => {
  logger.apiRequest(method, url, statusCode, duration, context)
}

export const logUserAction = (userId: string, action: string, context?: Record<string, any>) => {
  logger.userAction(userId, action, context)
}

export const logDatabaseQuery = (query: string, duration: number, context?: Record<string, any>) => {
  logger.databaseQuery(query, duration, context)
}

export const logAuthenticationEvent = (event: string, userId?: string, context?: Record<string, any>) => {
  logger.authenticationEvent(event, userId, context)
}

export const logBusinessEvent = (event: string, context?: Record<string, any>) => {
  logger.businessEvent(event, context)
}
