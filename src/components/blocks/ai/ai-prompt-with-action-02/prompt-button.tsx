import { Button, type ButtonProps, Icon, Text } from '@chakra-ui/react'

interface PromptButtonProps extends ButtonProps {
  icon: React.ReactElement;
  isLarge?: boolean;
}

export const PromptButton = (props: PromptButtonProps) => {
  const { icon, children, isLarge = false, ...rest } = props
  
  return (
    <Button
      w="full"
      variant="outline"
      minH={isLarge ? { base: '120px', md: '140px' } : { base: '4.5rem', md: '5rem' }}
      h="auto"
      bg="bg.panel"
      _light={{ bg: "white" }} // Ensures it pops in light mode
      borderColor="border.subtle"
      shadow="sm"
      _hover={{ 
        bg: "bg.muted", 
        _light: { bg: "gray.50" },
        borderColor: "green.500", 
        shadow: "md", 
        transform: "translateY(-2px)" 
      }}
      transition="all 0.2s"
      display="flex"
      flexDirection={isLarge ? "column" : "row"}
      alignItems={isLarge ? "flex-start" : "center"}
      justifyContent="flex-start"
      gap={isLarge ? "4" : "3"}
      p={isLarge ? { base: "6", md: "8" } : { base: "4", md: "5" }}
      rounded="2xl"
      whiteSpace="normal"
      {...rest}
    >
      <Icon 
        size={isLarge ? { base: "lg", md: "xl" } : "md"} 
        color="green.600"
        _dark={{ color: "green.400" }}
        flexShrink={0}
      >
        {icon}
      </Icon>

      <Text 
        fontWeight="semibold" 
        fontSize={isLarge ? { base: "md", md: "lg" } : { base: "sm", md: "md" }} 
        textAlign="left" 
        lineHeight="1.4"
        color="fg.default"
      >
        {children}
      </Text>
    </Button>
  )
}