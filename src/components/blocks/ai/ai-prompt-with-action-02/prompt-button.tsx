import { Button, type ButtonProps, Icon, Text } from '@chakra-ui/react'

interface PromptButtonProps extends ButtonProps {
  icon: React.ReactElement;
  isLarge?: boolean;
}

export const PromptButton = (props: PromptButtonProps) => {
  const { icon, children, isLarge = false, ...rest } = props
  
  return (
    <Button
      variant="outline"
      minH={isLarge ? { base: '100px', md: '120px' } : { base: '4rem' }}
      h={isLarge ? "auto" : "auto"}
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
      flexDirection={isLarge ? "column" : "row"}
      alignItems={isLarge ? "flex-start" : "center"} // Left align for large, center for small
      justifyContent="flex-start" // Stack from the top
      gap="3" // Space between icon and text
      p={isLarge ? "5" : "4"}
      rounded="2xl"
      whiteSpace="normal"
      {...rest}
    >
      <Icon 
        size={isLarge ? "lg" : "md"} 
        color="green.600"
        _dark={{ color: "green.400" }}
        flexShrink={0}
      >
        {icon}
      </Icon>

      <Text 
        fontWeight="semibold" 
        fontSize={isLarge ? "md" : "sm"} 
        textAlign="left" 
        lineHeight="1.4"
        color="fg.default" // Adapts to text color automatically
      >
        {children}
      </Text>
    </Button>
  )
}