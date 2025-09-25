// Simple monitoring and metrics system
// In production, use services like DataDog, New Relic, or Google Analytics

interface Metric {
  name: string
  value: number
  timestamp: number
  tags?: Record<string, string>
}

interface PerformanceMetric {
  name: string
  duration: number
  timestamp: number
  metadata?: Record<string, unknown>
}

class MonitoringService {
  private metrics: Metric[] = []
  private performanceMetrics: PerformanceMetric[] = []
  private maxMetrics = 1000 // Keep only last 1000 metrics in memory

  // Track custom metrics
  trackMetric(name: string, value: number, tags?: Record<string, string>): void {
    const metric: Metric = {
      name,
      value,
      timestamp: Date.now(),
      tags,
    }

    this.metrics.push(metric)

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendMetricToService(metric)
    }
  }

  // Track performance metrics
  trackPerformance(name: string, duration: number, metadata?: Record<string, unknown>): void {
    const performanceMetric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    }

    this.performanceMetrics.push(performanceMetric)

    // Keep only recent performance metrics
    if (this.performanceMetrics.length > this.maxMetrics) {
      this.performanceMetrics = this.performanceMetrics.slice(-this.maxMetrics)
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendPerformanceMetricToService(performanceMetric)
    }
  }

  // Track API response times
  trackApiResponse(method: string, endpoint: string, statusCode: number, duration: number): void {
    this.trackPerformance('api_response_time', duration, {
      method,
      endpoint,
      statusCode,
    })

    // Track error rates
    if (statusCode >= 400) {
      this.trackMetric('api_errors', 1, {
        method,
        endpoint,
        statusCode: statusCode.toString(),
      })
    }
  }

  // Track user actions
  trackUserAction(action: string, userId?: string, metadata?: Record<string, unknown>): void {
    this.trackMetric('user_action', 1, {
      action,
      userId: userId || 'anonymous',
      ...metadata,
    })
  }

  // Track business metrics
  trackBusinessMetric(metric: string, value: number, tags?: Record<string, string>): void {
    this.trackMetric(`business.${metric}`, value, tags)
  }

  // Track page views
  trackPageView(page: string, userId?: string): void {
    this.trackMetric('page_view', 1, {
      page,
      userId: userId || 'anonymous',
    })
  }

  // Track conversion events
  trackConversion(event: string, value?: number, metadata?: Record<string, unknown>): void {
    this.trackMetric('conversion', value || 1, {
      event,
      ...metadata,
    })
  }

  // Track errors
  trackError(error: Error, context?: Record<string, unknown>): void {
    this.trackMetric('error', 1, {
      error_name: error.name,
      error_message: error.message,
      ...context,
    })
  }

  // Get metrics for a specific time range
  getMetrics(name: string, startTime?: number, endTime?: number): Metric[] {
    let filtered = this.metrics.filter(m => m.name === name)

    if (startTime) {
      filtered = filtered.filter(m => m.timestamp >= startTime)
    }

    if (endTime) {
      filtered = filtered.filter(m => m.timestamp <= endTime)
    }

    return filtered
  }

  // Get performance metrics
  getPerformanceMetrics(name: string, startTime?: number, endTime?: number): PerformanceMetric[] {
    let filtered = this.performanceMetrics.filter(m => m.name === name)

    if (startTime) {
      filtered = filtered.filter(m => m.timestamp >= startTime)
    }

    if (endTime) {
      filtered = filtered.filter(m => m.timestamp <= endTime)
    }

    return filtered
  }

  // Get average performance for a metric
  getAveragePerformance(name: string, startTime?: number, endTime?: number): number {
    const metrics = this.getPerformanceMetrics(name, startTime, endTime)
    if (metrics.length === 0) return 0

    const total = metrics.reduce((sum, m) => sum + m.duration, 0)
    return total / metrics.length
  }

  // Get error rate
  getErrorRate(startTime?: number, endTime?: number): number {
    const now = Date.now()
    const start = startTime || now - (24 * 60 * 60 * 1000) // Last 24 hours
    const end = endTime || now

    const totalRequests = this.performanceMetrics.filter(
      m => m.name === 'api_response_time' && m.timestamp >= start && m.timestamp <= end
    ).length

    const errors = this.metrics.filter(
      m => m.name === 'api_errors' && m.timestamp >= start && m.timestamp <= end
    ).length

    return totalRequests > 0 ? (errors / totalRequests) * 100 : 0
  }

  // Send metrics to external service (placeholder)
  private sendMetricToService(metric: Metric): void {
    // In production, implement actual sending to monitoring service
    // Example: DataDog, New Relic, Google Analytics, etc.
    if (process.env.MONITORING_SERVICE_URL) {
      fetch(process.env.MONITORING_SERVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      }).catch(err => {
        console.error('Failed to send metric:', err)
      })
    }
  }

  private sendPerformanceMetricToService(metric: PerformanceMetric): void {
    // Similar to sendMetricToService but for performance metrics
    if (process.env.MONITORING_SERVICE_URL) {
      fetch(process.env.MONITORING_SERVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      }).catch(err => {
        console.error('Failed to send performance metric:', err)
      })
    }
  }
}

// Export singleton instance
export const monitoring = new MonitoringService()

// Helper functions for common monitoring patterns
export const trackApiCall = (method: string, endpoint: string, statusCode: number, duration: number) => {
  monitoring.trackApiResponse(method, endpoint, statusCode, duration)
}

export const trackUserAction = (action: string, userId?: string, metadata?: Record<string, unknown>) => {
  monitoring.trackUserAction(action, userId, metadata)
}

export const trackPageView = (page: string, userId?: string) => {
  monitoring.trackPageView(page, userId)
}

export const trackConversion = (event: string, value?: number, metadata?: Record<string, unknown>) => {
  monitoring.trackConversion(event, value, metadata)
}

export const trackError = (error: Error, context?: Record<string, unknown>) => {
  monitoring.trackError(error, context)
}

export const trackBusinessMetric = (metric: string, value: number, tags?: Record<string, string>) => {
  monitoring.trackBusinessMetric(metric, value, tags)
}

// Performance tracking decorator
export function trackPerformance(name: string) {
  return function (target: unknown, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = async function (...args: unknown[]) {
      const start = Date.now()
      try {
        const result = await method.apply(this, args)
        const duration = Date.now() - start
        monitoring.trackPerformance(name, duration, { method: propertyName })
        return result
      } catch (error) {
        const duration = Date.now() - start
        monitoring.trackPerformance(name, duration, {
          method: propertyName,
          error: true
        })
        throw error
      }
    }
  }
}

// React hook dla śledzenia wydajności komponentów został przeniesiony do hooks/usePerformanceTracking.ts
// Ten moduł powinien być importowany z 'use client' directive dla komponentów po stronie klienta
