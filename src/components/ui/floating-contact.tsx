'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Input,
  Portal,
  Stack,
  Textarea,
  Text,
  VStack,
  Icon,
  chakra
} from '@chakra-ui/react'
import { LuMessageSquare, LuX, LuCheck } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { supabase } from '@/lib/supabase'

const StyledSelect = chakra('select')

export function FloatingContact() {
  const { playClick, playHover, playSuccess } = useUiSounds()
  const params = useParams()
  const locale = (params?.locale as string) || 'en'

  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [services, setServices] = useState<any[]>([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service_needed: '',
    budget: '',
    timeline: '',
    message: ''
  })

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true })
      
      if (data && !error) {
        setServices(data)
      }
    }
    fetchServices()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    playClick()
    setIsSubmitting(true)

    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData])

    setIsSubmitting(false)

    if (!error) {
      playSuccess()
      setIsSuccess(true)
      setFormData({ name: '', email: '', service_needed: '', budget: '', timeline: '', message: '' })
    } else {
      console.error('Submission error:', error)
      alert("Something went wrong. Please try again.")
    }
  }

  const handleClose = () => {
    playClick()
    setIsOpen(false)
    setTimeout(() => setIsSuccess(false), 300) 
  }

  return (
    <Dialog.Root 
      open={isOpen} 
      onOpenChange={(e) => setIsOpen(e.open)} 
      placement="center" 
      motionPreset="slide-in-bottom"
    >
      <Box 
        position="fixed" 
        bottom={{ base: '6', md: '8' }} 
        right={{ base: '4', md: '8' }} 
        zIndex="popover"
      >
        <Dialog.Trigger asChild>
          <IconButton
            aria-label="Contact Us"
            bg="green.600"
            color="white"
            rounded="full"
            shadow="xl"
            _hover={{ bg: 'green.700', transform: 'scale(1.05)', shadow: '2xl' }}
            transition="all 0.2s"
            onClick={playClick}
            onMouseEnter={playHover}
            w={{ base: '56px', md: '64px' }}
            h={{ base: '56px', md: '64px' }}
          >
            <LuMessageSquare size="24px" />
          </IconButton>
        </Dialog.Trigger>
      </Box>

      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" zIndex="1400" />
        <Dialog.Positioner zIndex="1401">
          <Dialog.Content rounded="2xl" shadow="2xl" bg="bg.panel" p={{ base: 6, md: 8 }} maxW="md" w="full" mx="4">
            
            <Dialog.Header pb="2" px="0" pt="0" display="flex" justifyContent="space-between" alignItems="center">
              <Dialog.Title textStyle="xl" fontWeight="bold">
                {isSuccess ? "Message Sent" : "Let's work together"}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild position="static" inset="auto">
                <IconButton aria-label="Close dialog" variant="ghost" rounded="full" size="sm" onClick={handleClose}>
                  <LuX />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body px="0" pb="0">
              {isSuccess ? (
                <VStack gap="4" py="8" textAlign="center">
                  <Box bg="green.100" p="3" rounded="full">
                    <Icon as={LuCheck} boxSize="8" color="green.600" />
                  </Box>
                  <Text fontSize="lg" fontWeight="medium">Thanks for reaching out!</Text>
                  <Text color="fg.muted">I'll review your details and get back to you shortly.</Text>
                  <Button mt="4" bg="green.600" color="white" onClick={handleClose} _hover={{ bg: "green.700" }}>
                    Close Window
                  </Button>
                </VStack>
              ) : (
                <>
                  <Text color="fg.muted" mb="6">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </Text>

                  <form onSubmit={handleSubmit}>
                    <Stack gap="5">
                      <Stack direction={{ base: "column", md: "row" }} gap="4">
                        <Box flex="1">
                          <Text fontWeight="medium" fontSize="sm" mb="2">
                            Name <Text as="span" color="red.500">*</Text>
                          </Text>
                          <Input fontSize="16px" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" required bg="bg.muted" />
                        </Box>
                        
                        <Box flex="1">
                          <Text fontWeight="medium" fontSize="sm" mb="2">
                            Email <Text as="span" color="red.500">*</Text>
                          </Text>
                          <Input fontSize="16px" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" required bg="bg.muted" />
                        </Box>
                      </Stack>

                      <Box>
                        <Text fontWeight="medium" fontSize="sm" mb="2">Service Needed</Text>
                        <StyledSelect fontSize="16px" name="service_needed" value={formData.service_needed} onChange={handleChange} w="full" h="10" px="3" rounded="md" bg="bg.muted" border="1px solid" borderColor="border.subtle" outline="none" _focus={{ borderColor: "green.500" }}>
                          <option value="">Select a service...</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.title_en}>
                              {locale === 'es' ? (service.title_es || service.title_en) : service.title_en}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </StyledSelect>
                      </Box>

                      <Stack direction={{ base: "column", md: "row" }} gap="4">
                        <Box flex="1">
                          <Text fontWeight="medium" fontSize="sm" mb="2">Budget</Text>
                          <StyledSelect fontSize="16px" name="budget" value={formData.budget} onChange={handleChange} w="full" h="10" px="3" rounded="md" bg="bg.muted" border="1px solid" borderColor="border.subtle" outline="none" _focus={{ borderColor: "green.500" }}>
                            <option value="">Select range...</option>
                            <option value="< $5k">Under $5k</option>
                            <option value="$5k - $10k">$5k - $10k</option>
                            <option value="$10k+">$10k+</option>
                          </StyledSelect>
                        </Box>
                        
                        <Box flex="1">
                          <Text fontWeight="medium" fontSize="sm" mb="2">Timeline</Text>
                          <StyledSelect fontSize="16px" name="timeline" value={formData.timeline} onChange={handleChange} w="full" h="10" px="3" rounded="md" bg="bg.muted" border="1px solid" borderColor="border.subtle" outline="none" _focus={{ borderColor: "green.500" }}>
                            <option value="">Select timeline...</option>
                            <option value="ASAP">ASAP</option>
                            <option value="1-3 months">1-3 Months</option>
                            <option value="Flexible">Flexible</option>
                          </StyledSelect>
                        </Box>
                      </Stack>

                      <Box>
                        <Text fontWeight="medium" fontSize="sm" mb="2">
                          Message <Text as="span" color="red.500">*</Text>
                        </Text>
                        <Textarea fontSize="16px" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me a bit about your project..." rows={4} required bg="bg.muted" />
                      </Box>

                      <Stack direction="row" justify="flex-end" gap="3" mt="2">
                        <Button variant="outline" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button type="submit" bg="green.600" color="white" _hover={{ bg: "green.700" }} loading={isSubmitting}>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                </>
              )}
            </Dialog.Body>

          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}