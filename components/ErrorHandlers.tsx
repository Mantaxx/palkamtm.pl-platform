'use client'

import { useEffect } from 'react'
import { initErrorHandlers } from '@/lib/error-handlers'

export function ErrorHandlers() {
  useEffect(() => {
    initErrorHandlers()
  }, [])

  return null
}
