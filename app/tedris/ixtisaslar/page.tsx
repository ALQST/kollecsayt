"use client"

import {
  FolderSolid,
  BuildingSolid,
  CreditCardSolid,
  BookSolid,
  BankSolid,
  UserSolid,
  DesktopSolid,
} from "@mynaui/icons-react"

import { Box, VStack, HStack, Text, SimpleGrid, Container } from "@chakra-ui/react"

// This page is statically generated at build time
export const dynamic = "force-static"

import PageTemplate from "@/app/components/PageTemplate"
const specialties = [
  {
    name: "Kargüzarlıq və arxiv işi",
    code: "040202",
    Icon: FolderSolid,
  },
  {
    name: "Bank işi",
    code: "040401",
    Icon: BuildingSolid,
  },
  {
    name: "Maliyyə işi",
    code: "040404",
    Icon: CreditCardSolid,
  },
  {
    name: "Mühasibat uçotu",
    code: "040406",
    Icon: BookSolid,
  },
  {
    name: "Vergi işi",
    code: "040410",
    Icon: BankSolid,
  },
  {
    name: "Sosial iş",
    code: "040713",
    Icon: UserSolid,
  },
  {
    name: "Komputer sistemlərində proqram təminatı",
    code: "040530",
    Icon: DesktopSolid,
  },
]

export default function SpecialtiesPage() {
  return (
    <PageTemplate title="İxtisaslar">
      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {specialties.map((specialty, index) => {
            const SpecialtyIcon = specialty.Icon
            return (
              <Box
                key={index}
                border="1px"
                borderColor="#C1CAD6"
                borderRadius="xl"
                p={6}
                bg="#FFFFFF" // Changed to blue for better contrast with white icons
                transition="transform 0.3s ease"
                _hover={{
                  transform: "scale(1.05)",
                }}
              >
                <HStack spacing={4} align="center">
                  {/* The key fix is here - using style prop instead of color prop */}
                  <SpecialtyIcon
                    width={32}
                    height={32}
                    style={{ color: "#111827" }} // Using style prop for color
                  />
                  <VStack align="start" spacing={1}>
                    <Text
                      fontWeight="bold"
                      color="#111827" // Changed text color to white for better contrast
                    >
                      {specialty.name}
                    </Text>
                    <Text fontSize="sm" color="#111827" opacity={0.7}>
                      Kod: {specialty.code}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            )
          })}
        </SimpleGrid>
      </Container>
    </PageTemplate>
  )
}

