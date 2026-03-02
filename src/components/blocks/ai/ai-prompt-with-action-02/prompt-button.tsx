import { Button, type ButtonProps, Icon, Text } from '@chakra-ui/react'

interface PromptButtonProps extends ButtonProps {
  icon: React.ReactElement
}

export const PromptButton = (props: PromptButtonProps) => {
  const { icon, children, ...rest } = props
  return (
    <Button
      variant="outline"
      minH={{ base: '100px', md: '120px' }}
      bg="bg.panel" // Solid background in both modes
      borderColor="border.subtle"
      shadow="sm"
      _hover={{ 
        bg: "bg.muted", 
        borderColor: "green.500", 
        shadow: "md", 
        transform: "translateY(-2px)" 
      }}
      transition="all 0.2s"
      display="flex"
      flexDirection="column"
      alignItems="flex-start" // Left align
      justifyContent="flex-start" // Stack from the top
      gap="3" // Space between icon and text
      p="5"
      rounded="2xl"
      whiteSpace="normal"
      {...rest}
    >
      <Icon 
        size="lg" 
        color="green.600"
        _dark={{ color: "green.400" }}
      >
        {icon}
      </Icon>

      <Text 
        fontWeight="semibold" 
        fontSize="md" 
        textAlign="left" 
        lineHeight="1.4"
        color="fg.default" // Adapts to text color automatically
      >
        {children}
      </Text>
    </Button>
  )
}