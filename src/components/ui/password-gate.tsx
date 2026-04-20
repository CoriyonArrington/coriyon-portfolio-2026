'use client'

import { useState } from 'react'
import { Box, Button, Input, Stack, Text, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { LuLock } from 'react-icons/lu'
import { unlockProject } from '@/app/actions/unlock-project'

interface PasswordGateProps {
  slug: string
  title?: string
  description?: string
  buttonText?: string
  placeholderText?: string
}

export function PasswordGate({ 
  slug, 
  title = "Protected Case Study", 
  description = "Please enter the password to view the strategic approach, metrics, and outcomes for this project.",
  buttonText = "Unlock Case Study",
  placeholderText = "Enter password"
}: PasswordGateProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await unlockProject(slug, password)
      if (result.success) {
        // Refresh the current route to fetch the protected content from the server
        router.refresh()
      } else {
        setError(result.error || 'Incorrect password')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box 
      bg="bg.panel" 
      p={{ base: "8", md: "12" }} 
      rounded="3xl" 
      borderWidth="1px" 
      borderColor="border.subtle" 
      shadow="xl"
      textAlign="center"
    >
      <Stack gap="6" align="center">
        <Box p="4" bg="bg.muted" rounded="full" color="fg.muted">
          <LuLock size={32} />
        </Box>
        
        <Stack gap="2">
          <Heading size="2xl" color="fg.default">{title}</Heading>
          <Text color="fg.muted" fontSize="lg">{description}</Text>
        </Stack>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack gap="4" mt="4">
            <Input 
              type="password" 
              placeholder={placeholderText} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="xl"
              rounded="xl"
              textAlign="center"
              bg="bg.canvas"
              _focus={{ borderColor: "colorPalette.500", ringColor: "colorPalette.500" }}
            />
            {error && <Text color="red.500" fontSize="sm">{error}</Text>}
            
            <Button 
              type="submit" 
              size="xl" 
              w="full" 
              rounded="xl" 
              loading={isLoading}
              colorPalette="gray"
              variant="solid"
            >
              {buttonText}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  )
}