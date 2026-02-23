'use client'

import { useEffect } from 'react'
import clarity from '@microsoft/clarity'

export function ClarityAnalytics() {
  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window !== 'undefined') {
      clarity.init('vllsoax9ay')
    }
  }, [])

  return null
}