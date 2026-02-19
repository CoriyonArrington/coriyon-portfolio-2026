'use client'

import { useEffect, useState } from 'react'

interface TimedStateProps {
  defaultValue: string
  timeout: number
  values: string[]
}

export const useTimedState = (props: TimedStateProps) => {
  const { defaultValue, timeout, values } = props
  const [selected, setSelected] = useState<string>(defaultValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      const idx = values.indexOf(selected)
      let nextIdx = idx + 1
      if (nextIdx >= values.length) nextIdx = 0
      if (nextIdx < 0) nextIdx = values.length - 1
      setSelected(values[nextIdx])
    }, timeout)

    return () => clearTimeout(timer)
  }, [values, timeout, selected])

  return [selected, setSelected] as const
}
