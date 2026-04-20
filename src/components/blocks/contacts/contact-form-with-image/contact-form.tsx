'use client'

import { 
  Button, 
  Field, 
  Input, 
  Stack, 
  type StackProps, 
  Textarea, 
  NativeSelect, 
  Alert 
} from '@chakra-ui/react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export const ContactForm = (props: StackProps) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service_needed: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData])

      if (submitError) throw submitError

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        service_needed: '',
        budget: '',
        timeline: '',
        message: ''
      })
    } catch (err: any) {
      console.error('Error submitting form:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Alert.Root status="success" variant="subtle" borderRadius="l3" p="6" alignItems="flex-start">
        <Alert.Indicator mt="1" />
        <Alert.Content>
          <Alert.Title textStyle="lg" fontWeight="semibold">Message sent successfully!</Alert.Title>
          <Alert.Description color="fg.muted" mt="1">
            Thanks for reaching out. I've received your details and will get back to you as soon as possible.
          </Alert.Description>
          <Button 
            mt="4" 
            size="sm" 
            variant="outline" 
            onClick={() => setSuccess(false)}
          >
            Send another message
          </Button>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <Stack as="form" gap={{ base: '6', md: '8' }} onSubmit={handleSubmit} {...props}>
      {error && (
        <Alert.Root status="error" variant="subtle" borderRadius="md">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Submission failed</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <Stack gap={{ base: '4', md: '6' }}>
        <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '4', md: '6' }}>
          <Field.Root required>
            <Field.Label fontWeight="medium">Name</Field.Label>
            <Input size="xl" variant="outline" bg="bg.panel" name="name" value={formData.name} onChange={handleChange} required />
          </Field.Root>
          <Field.Root required>
            <Field.Label fontWeight="medium">Email</Field.Label>
            <Input size="xl" variant="outline" bg="bg.panel" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Field.Root>
        </Stack>

        <Field.Root>
          <Field.Label fontWeight="medium">Service Needed</Field.Label>
          <NativeSelect.Root size="xl" variant="outline">
            <NativeSelect.Field bg="bg.panel" name="service_needed" value={formData.service_needed} onChange={handleChange}>
              <option value="">Select a service (optional)</option>
              <option value="Product Design (UI/UX)">Product Design (UI/UX)</option>
              <option value="Web Development">Web/App Development</option>
              <option value="Design Strategy">Design Strategy & Consulting</option>
              <option value="Other">Other</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '4', md: '6' }}>
          <Field.Root>
            <Field.Label fontWeight="medium">Budget</Field.Label>
            <NativeSelect.Root size="xl" variant="outline">
              <NativeSelect.Field bg="bg.panel" name="budget" value={formData.budget} onChange={handleChange}>
                <option value="">Select a range (optional)</option>
                <option value="<$5k">&lt; $5,000</option>
                <option value="$5k - $10k">$5k - $10k</option>
                <option value="$10k - $25k">$10k - $25k</option>
                <option value="$25k+">$25k+</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
          
          <Field.Root>
            <Field.Label fontWeight="medium">Timeline</Field.Label>
            <NativeSelect.Root size="xl" variant="outline">
              <NativeSelect.Field bg="bg.panel" name="timeline" value={formData.timeline} onChange={handleChange}>
                <option value="">Select timeframe (optional)</option>
                <option value="ASAP">ASAP</option>
                <option value="1-3 months">1 to 3 months</option>
                <option value="3-6 months">3 to 6 months</option>
                <option value="Flexible">Flexible</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
        </Stack>

        <Field.Root required>
          <Field.Label fontWeight="medium">Message</Field.Label>
          <Textarea
            placeholder="Tell us a little bit about what you're working on..."
            size="xl"
            rows={5}
            resize="none"
            variant="outline"
            bg="bg.panel"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Field.Root>
      </Stack>
      
      <Button 
        type="submit" 
        size="xl"
        h={{ base: 14, md: 16 }}
        px={{ base: 6, md: 8 }}
        fontSize="lg"
        alignSelf={{ base: 'stretch', sm: 'start' }} 
        variant="solid" 
        loading={loading}
      >
        {loading ? "Sending..." : "Submit message"}
      </Button>
    </Stack>
  )
}