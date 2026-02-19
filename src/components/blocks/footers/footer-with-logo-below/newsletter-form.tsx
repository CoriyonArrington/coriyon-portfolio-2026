import { Button, Field, Input, Stack } from '@chakra-ui/react'

export const NewsletterForm = () => {
  return (
    <Stack as="form" gap="4" direction={{ base: 'column', sm: 'row' }} height="min-content">
      <Field.Root gap="4" maxW="md">
        <Field.Label>Stay up to date</Field.Label>
        <Input placeholder="Enter your email" type="email" required />
      </Field.Root>
      <Button alignSelf={{ base: 'stretch', sm: 'flex-end' }}>Subscribe</Button>
    </Stack>
  )
}
