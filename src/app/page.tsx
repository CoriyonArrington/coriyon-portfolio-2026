import { Box, Stack } from "@chakra-ui/react"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
// Updated import to point to the hero-with-full-image variant
import { Block as HeroWithFullImage } from "@/components/blocks/heroes/hero-with-full-image/block"

export default function Home() {
  return (
    <Box bg="bg.canvas" minH="100vh">
      {/* The Navbar Island is positioned 'absolute' by default in the block code.
          It will sit at the top of the page.
      */}
      <NavbarIsland />

      <Stack gap="0">
        {/* Padding-top is set here to ensure the hero content starts 
            below the floating navbar. Adjust "32" if your hero text 
            is still partially covered. 
        */}
        <Box pt={{ base: "24", md: "32" }}>
            <HeroWithFullImage />
        </Box>
      </Stack>
    </Box>
  )
}