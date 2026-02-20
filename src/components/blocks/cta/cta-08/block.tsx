import { Button, Card, Heading, SimpleGrid, Stack, Text, Icon } from '@chakra-ui/react'
import { LuCalendar, LuMail, LuLinkedin } from 'react-icons/lu'
import NextLink from 'next/link'
import { SectionHeader } from './section-header'

interface CtaProps {
  dict?: any;
}

export const Block = ({ dict }: CtaProps) => {
  return (
    <Stack gap={{ base: '8', md: '12' }}>
      <SectionHeader 
        tagline={dict?.badge || "Let's connect"}
        headline={dict?.title || "Get in touch"}
        description={dict?.description}
      />

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
        
        {/* Card 1: Calendly */}
        <Card.Root variant="outline" p="6" borderRadius="l3">
          <Card.Body gap="4" alignItems="center" textAlign="center" p="0">
            <Icon size="2xl" color="green.600" mb="2">
              <LuCalendar />
            </Icon>
            <Heading size="md" fontWeight="bold">{dict?.card1?.title || "Book a call"}</Heading>
            <Text color="fg.muted">{dict?.card1?.description || "Schedule a free 30-minute intro call to discuss your next big project."}</Text>
            <Button variant="ghost" color="fg" mt="4" asChild>
              <NextLink href="https://calendly.com/coriyonarrington/intro-call" target="_blank">
                {dict?.card1?.button || "Schedule a call"} &gt;
              </NextLink>
            </Button>
          </Card.Body>
        </Card.Root>

        {/* Card 2: Email */}
        <Card.Root variant="outline" p="6" borderRadius="l3">
          <Card.Body gap="4" alignItems="center" textAlign="center" p="0">
            <Icon size="2xl" color="green.600" mb="2">
              <LuMail />
            </Icon>
            <Heading size="md" fontWeight="bold">{dict?.card2?.title || "Email me"}</Heading>
            <Text color="fg.muted">{dict?.card2?.description || "Drop me a line directly. I usually reply within 24 hours."}</Text>
            <Button variant="ghost" color="fg" mt="4" asChild>
              <NextLink href="mailto:coriyonarrington@gmail.com">
                {dict?.card2?.button || "Send an email"} &gt;
              </NextLink>
            </Button>
          </Card.Body>
        </Card.Root>

        {/* Card 3: LinkedIn */}
        <Card.Root variant="outline" p="6" borderRadius="l3">
          <Card.Body gap="4" alignItems="center" textAlign="center" p="0">
            <Icon size="2xl" color="green.600" mb="2">
              <LuLinkedin />
            </Icon>
            <Heading size="md" fontWeight="bold">{dict?.card3?.title || "LinkedIn"}</Heading>
            <Text color="fg.muted">{dict?.card3?.description || "Connect with me professionally and see my latest updates."}</Text>
            <Button variant="ghost" color="fg" mt="4" asChild>
              <NextLink href="https://linkedin.com/in/coriyon" target="_blank">
                {dict?.card3?.button || "View profile"} &gt;
              </NextLink>
            </Button>
          </Card.Body>
        </Card.Root>

      </SimpleGrid>
    </Stack>
  )
}