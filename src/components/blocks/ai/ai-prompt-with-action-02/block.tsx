'use client'

import { useRef, useEffect, useState } from 'react'
import { Box, Center, Container, Flex, Heading, HStack, IconButton, SimpleGrid, Span, Stack, Text, Textarea } from '@chakra-ui/react'
import { HiBookOpen, HiLightBulb, HiTerminal } from 'react-icons/hi'
import { LuSendHorizontal, LuUser, LuBot } from 'react-icons/lu'
import { PromptButton } from './prompt-button'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import MarkdownRenderer from '@/components/ui/markdown-renderer'

interface AIBlockProps {
  dict?: any;
  locale?: string;
}

export const Block = ({ dict, locale = 'en' }: AIBlockProps) => {
  const { playHover, playWhoosh } = useUiSounds()
  
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    playWhoosh();
    const userMsg = { id: Date.now().toString(), role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('🔥 Server Error:', res.status, errorText);
        throw new Error('Network response was not ok');
      }

      if (!res.body) throw new Error('No stream body found');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      
      const assistantMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('✅ Stream complete.');
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMsgId ? { ...msg, content: fullText } : msg
          )
        );
      }
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: 'Sorry, I encountered an error connecting to the server. Please ensure the API route is correctly configured.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e?: any) => {
    if (e) e.preventDefault();
    sendMessage(input);
  };

  const handlePromptClick = (text: string) => {
    sendMessage(text);
  };

  const defaultPrompts = locale === 'es' ? [
    { text: "¿Qué servicios ofreces?", icon: <HiLightBulb /> },
    { text: "Cuéntame sobre tu proceso de diseño", icon: <HiTerminal /> },
    { text: "Muéstrame tus experimentos técnicos", icon: <HiBookOpen /> },
    { text: "Reserva una llamada de introducción", icon: <HiLightBulb /> }
  ] : [
    { text: "What services do you offer?", icon: <HiLightBulb /> },
    { text: "Tell me about your design process", icon: <HiTerminal /> },
    { text: "Show me your technical experiments", icon: <HiBookOpen /> },
    { text: "Book an intro call", icon: <HiLightBulb /> }
  ]

  const prompts = dict?.prompts || defaultPrompts

  return (
    <Flex direction="column" h="full" bg="transparent">
      
      <Box flex="1" overflowY="auto" ref={scrollRef} px="4" display="flex" flexDirection="column">
        <Container maxW="4xl" flex="1" display="flex" flexDirection="column" pt={{ base: "8", md: "8" }} pb="4">
          
          {messages.length === 0 ? (
            <Stack gap="8" my="auto" w="full">
              {/* FIX: Left aligned, smaller font sizes, concise text, and green highlighted name */}
              <Heading size={{ base: "2xl", md: "3xl" }} fontWeight="bold" letterSpacing="tight" textAlign="left" lineHeight="1.3">
                <Span color="fg.default">
                  {locale === 'es' ? "Hola, soy la " : "Hi, I'm "}
                  <Span color="green.600">
                    {locale === 'es' ? "IA de Coriyon." : "Coriyon's AI."}
                  </Span>
                </Span> 
                <br />
                <Span color="fg.muted" fontWeight="medium" fontSize={{ base: "xl", md: "2xl" }}>
                  {locale === 'es' ? "¿Cómo puedo ayudarte?" : "How can I help you?"}
                </Span>
              </Heading>

              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" mt="2" w="full">
                {prompts.map((prompt: any, index: number) => (
                  <PromptButton 
                    key={index} 
                    icon={prompt.icon} 
                    onClick={() => handlePromptClick(prompt.text)}
                    onMouseEnter={() => playHover()}
                    // FIX: Allows text to wrap naturally without clipping
                    h="auto"
                    minH="4rem"
                    py="4"
                    px="5"
                    whiteSpace="normal"
                    textAlign="left"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    {prompt.text}
                  </PromptButton>
                ))}
              </SimpleGrid>
            </Stack>
          ) : (
            <Stack gap="8" justify="flex-end" flex="1">
              {messages.map((msg: any) => (
                <HStack key={msg.id} align="flex-start" gap="4" maxW="3xl" alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
                  {msg.role === 'assistant' && (
                    <Box p="2" bg="green.600" rounded="lg" color="white" flexShrink={0}><LuBot /></Box>
                  )}
                  <Box 
                    bg={msg.role === 'user' ? 'green.600' : 'bg.panel'} 
                    color={msg.role === 'user' ? 'white' : 'fg.default'}
                    borderWidth={msg.role === 'user' ? '0' : '1px'}
                    borderColor="border.subtle"
                    p="4" 
                    rounded="2xl" 
                    borderBottomLeftRadius={msg.role === 'assistant' ? '0' : '2xl'}
                    borderBottomRightRadius={msg.role === 'user' ? '0' : '2xl'}
                    shadow="sm"
                    maxW="full"
                    overflowX="auto"
                  >
                    {msg.role === 'user' ? (
                      <Text lineHeight="relaxed" whiteSpace="pre-wrap">{msg.content}</Text>
                    ) : (
                      <MarkdownRenderer content={msg.content} />
                    )}
                  </Box>
                  {msg.role === 'user' && (
                    <Box p="2" bg="bg.subtle" rounded="lg" flexShrink={0} borderWidth="1px" borderColor="border.subtle"><LuUser /></Box>
                  )}
                </HStack>
              ))}
              {isLoading && (
                <HStack gap="4" align="center">
                  <Box p="2" bg="green.600" rounded="lg" color="white"><LuBot /></Box>
                  <Text color="fg.muted" fontStyle="italic" fontSize="sm">Coriyon AI is typing...</Text>
                </HStack>
              )}
            </Stack>
          )}
        </Container>
      </Box>

      <Box flex="0" bg="bg.panel" borderTopWidth="1px" borderColor="border.subtle" pt="4" pb={{ base: "6", md: "6" }} zIndex="10">
        <Container maxW="4xl">
          <form onSubmit={handleSend}>
            <Flex 
              bg="bg.muted" 
              borderRadius="2xl" 
              px="4" 
              py="3" 
              align="center" 
              shadow="sm" 
              border="1px solid" 
              borderColor="border.subtle"
            >
              <Textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() && !isLoading) {
                      handleSend();
                    }
                  }
                }}
                placeholder={locale === 'es' ? "Pregúntame lo que sea..." : "Ask me anything..."}
                variant="flushed"
                resize="none"
                width="full"
                bg="transparent"
                outline="none"
                borderBottom="none"
                _focus={{ borderBottom: "none", boxShadow: "none" }}
                px="2"
                color="fg.default"
                _placeholder={{ color: "fg.muted" }}
              />
              <HStack gap="1">
                <IconButton 
                  size="md" 
                  type="submit"
                  colorPalette="green" 
                  aria-label="Send" 
                  disabled={!input.trim() || isLoading}
                >
                  <LuSendHorizontal />
                </IconButton>
              </HStack>
            </Flex>
          </form>
          <Center mt="3">
            <Text fontSize="xs" color="fg.subtle">
              {locale === 'es' ? "Conectado a Gemini 2.5 Flash. La IA de Coriyon puede cometer errores." : "Connected to Gemini 2.5 Flash. Coriyon AI can make mistakes."}
            </Text>
          </Center>
        </Container>
      </Box>
    </Flex>
  )
}