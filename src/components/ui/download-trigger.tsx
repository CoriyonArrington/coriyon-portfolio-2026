import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import * as React from 'react'

interface DownloadTriggerProps extends HTMLChakraProps<'a'> {
  /** The URL of the file to download */
  value?: string
  /** The name of the file when downloaded */
  fileName?: string
}

export const DownloadTrigger = React.forwardRef<HTMLAnchorElement, DownloadTriggerProps>(
  function DownloadTrigger(props, ref) {
    const { value, fileName, children, ...rest } = props
    return (
      <chakra.a
        ref={ref}
        href={value}
        download={fileName}
        display="inline-flex" // Ensures it wraps the button correctly
        textDecoration="none"
        {...rest}
      >
        {children}
      </chakra.a>
    )
  }
)