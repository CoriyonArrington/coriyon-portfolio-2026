'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Badge, Box, Button, Center, Container, Flex, Heading, HStack, IconButton, SimpleGrid, Span, Stack, Text, Textarea, Highlight } from '@chakra-ui/react'
import { HiBookOpen, HiLightBulb, HiTerminal, HiSparkles } from 'react-icons/hi'
import { LuSendHorizontal, LuUser, LuBot } from 'react-icons/lu'
import { PromptButton } from './prompt-button'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import MarkdownRenderer from '@/components/ui/markdown-renderer'

interface AIBlockProps {
  dict?: any;
  locale?: string;
  isHero?: boolean;
}

export const Block = ({ dict, locale = 'en', isHero = false }: AIBlockProps) => {
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

  const rawTitle = dict?.hero?.title || (locale === 'es' ? "Hola, soy la *IA de Coriyon.*" : "Hi, I'm *Coriyon's AI.*")
  const rawDescription = dict?.hero?.description || (locale === 'es' ? "¿Cómo puedo ayudarte?" : "How can I help you?")
  const tagline = dict?.hero?.tagline

  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    playWhoosh();
    
    const userMsgId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const assistantMsgId = `ai-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const userMsg = { id: userMsgId, role: 'user', content: text };
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
        if (res.status === 429) {
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
        const errorText = await res.text();
        console.error('🔥 Server Error:', res.status, errorText);
        throw new Error('Network response was not ok');
      }

      if (!res.body) throw new Error('No stream body found');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      
      setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (fullText.trim() === '') {
            throw new Error('RATE_LIMIT_EXCEEDED');
          }
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
    } catch (error: any) {
      if (error.message !== 'RATE_LIMIT_EXCEEDED') {
        console.error('❌ Failed to send message:', error);
      }
      
      let fallbackMessage = locale === 'es' 
        ? 'Lo siento, encontré un error al conectarme al servidor. Por favor, inténtalo de nuevo más tarde.' 
        : 'Sorry, I encountered an error connecting to the server. Please try again later.';

      if (error.message === 'RATE_LIMIT_EXCEEDED') {
        fallbackMessage = locale === 'es'
          ? '¡He alcanzado mi límite de mensajes por ahora! La IA está tomando un descanso. Mientras tanto, puedes **[ver los servicios](/services)** o contactar a Coriyon directamente.'
          : 'I have reached my message quota for right now! The AI is taking a quick nap. In the meantime, feel free to **[browse services](/services)** or contact Coriyon directly.';
      }

      setMessages(prev => {
        const exists = prev.some(m => m.id === assistantMsgId);
        if (exists) {
          return prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: fallbackMessage } : msg);
        }
        return [...prev, { id: `err-${Date.now()}`, role: 'assistant', content: fallbackMessage }];
      });
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
    { text: "¿Cómo utilizas la IA en el diseño de productos?", icon: <HiSparkles /> },
    { text: "Cuéntame sobre tu caso de estudio más impactante", icon: <HiBookOpen /> },
    { text: "¿Cuál es tu enfoque para la estrategia de producto?", icon: <HiTerminal /> },
    { text: "¿Qué impacto comercial has impulsado?", icon: <HiLightBulb /> }
  ] : [
    { text: "How do you use AI in product design?", icon: <HiSparkles /> },
    { text: "Tell me about your most impactful case study", icon: <HiBookOpen /> },
    { text: "What is your approach to product strategy?", icon: <HiTerminal /> },
    { text: "What business impact have you driven?", icon: <HiLightBulb /> }
  ]

  const prompts = dict?.prompts || defaultPrompts

  return (
    <Flex direction="column" h="full" bg="transparent">
      
      <Box flex="1" overflowY="auto" ref={scrollRef} px={isHero ? "0" : "4"} display="flex" flexDirection="column">
        <Container maxW={isHero ? "5xl" : "full"} px="0" flex="1" display="flex" flexDirection="column" pb="4">
          
          {messages.length === 0 ? (
            <Stack gap={isHero ? { base: "8", md: "12" } : "8"} my="auto" w="full" align={isHero ? "center" : "flex-start"} textAlign={isHero ? "center" : "left"}>
              
              <Box w="full">
                {tagline && (
                  <Badge size="lg" variant="subtle" colorPalette="gray" alignSelf={isHero ? "center" : "flex-start"} rounded="full" px="4" py="1" mb="6" display="inline-flex">
                    {tagline}
                  </Badge>
                )}
                
                <Heading 
                  as={isHero ? "h1" : "h2"}
                  size={isHero ? { base: "5xl", md: "6xl", lg: "7xl" } : { base: "2xl", md: "3xl" }} 
                  fontWeight="bold" 
                  letterSpacing="tight" 
                  lineHeight={{ base: "1.2", md: "1.1" }}
                  maxW={isHero ? "4xl" : "full"}
                  mx={isHero ? "auto" : "0"}
                  pr={isHero ? "0" : "4"}
                >
                  <Highlight query={highlightQueries} styles={{ color: "green.600" }}>
                    {displayTitle}
                  </Highlight>
                  <br />
                  <Span color="fg.muted" fontWeight="medium" fontSize={isHero ? { base: "2xl", md: "3xl" } : { base: "xl", md: "2xl" }} mt={isHero ? "4" : "0"} display="block">
                    {rawDescription}
                  </Span>
                </Heading>
              </Box>

              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" mt="2" w="full">
                {prompts.map((prompt: any, index: number) => (
                  <PromptButton 
                    key={index} 
                    icon={prompt.icon} 
                    onClick={() => handlePromptClick(prompt.text)}
                    onMouseEnter={() => playHover()}
                    isLarge={isHero}
                  >
                    {prompt.text}
                  </PromptButton>
                ))}
              </SimpleGrid>
            </Stack>
          ) : (
            <Stack gap="8" justify="flex-end" flex="1">
              {messages.map((msg: any, index: number) => {
                const isAssistant = msg.role === 'assistant';
                const isLastMessage = index === messages.length - 1;
                
                let displayText = msg.content;
                let suggestions: string[] = [];

                if (isAssistant) {
                  const splitIndex = displayText.indexOf('---SUGGESTIONS---');
                  
                  if (splitIndex !== -1) {
                    const suggestionsText = displayText.substring(splitIndex + '---SUGGESTIONS---'.length);
                    displayText = displayText.substring(0, splitIndex).trim();
                    
                    suggestions = suggestionsText
                      .split('\n')
                      .map((s: string) => s.replace(/^[-*•]\s*/, '').trim())
                      .filter((s: string) => s.length > 0);
                  } else {
                    displayText = displayText.replace(/-{1,3}[A-Z]*$/, '').trim();
                  }
                }

                return (
                  <Stack key={msg.id} gap="2" alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'} maxW={isHero ? "3xl" : "full"}>
                    <HStack align="flex-start" gap="4">
                      {msg.role === 'assistant' && (
                        <Box p="2" bg="green.600" rounded="lg" color="white" flexShrink={0} mt="1"><LuBot /></Box>
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
                          <MarkdownRenderer content={displayText} />
                        )}
                      </Box>
                      {msg.role === 'user' && (
                        <Box p="2" bg="bg.subtle" rounded="lg" flexShrink={0} mt="1" borderWidth="1px" borderColor="border.subtle"><LuUser /></Box>
                      )}
                    </HStack>

                    {isAssistant && suggestions.length > 0 && isLastMessage && !isLoading && (
                      <Flex wrap="wrap" gap="2" ml="12" mt="1">
                        {suggestions.map((suggestion, i) => (
                          <Button
                            key={i}
                            size="sm"
                            variant="outline"
                            colorPalette="green"
                            rounded="full"
                            onClick={() => handlePromptClick(suggestion)}
                            fontSize="xs"
                            fontWeight="medium"
                            h="auto"
                            py="1.5"
                            px="3"
                            whiteSpace="normal"
                            textAlign="left"
                            _hover={{ bg: 'green.50', _dark: { bg: 'green.900' } }}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </Flex>
                    )}
                  </Stack>
                )
              })}
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

      <Box flex="0" bg="transparent" pt="4" pb={{ base: "6", md: "6" }} zIndex="10">
        <Container maxW={isHero ? "5xl" : "full"} px={isHero ? "0" : "4"}>
          <form onSubmit={handleSend}>
            <Flex 
              bg="bg.panel" // Solid base
              _light={{ bg: "white" }} // Explicitly white for light mode
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