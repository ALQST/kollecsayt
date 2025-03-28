'use client'

import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { 
  AcademicHatSolid,
  ColumnsSolid,
  UserSolid,
  BriefcaseSolid,
  GlobeSolid,
  FlaskSolid
} from '@mynaui/icons-react'

const cards = [
  {
    title: 'Təhsil Keyfiyyəti və Müəllim Heyəti',
    description: 'Yüksək keyfiyyətli təhsil, peşəkar müəllimlər və UNEC-in akademik dəstəyi ilə zəngin tədris imkanları təklif edir.',
    Icon: AcademicHatSolid,
    iconBg: '#14315120',
    iconColor: '#1f487a'
  },
  {
    title: 'Müasir İnfrastruktur və Tədris Mühiti',
    description: 'Texniki təchizatlı sinif otaqları, elektron kitabxana və rahat kampus şəraiti ilə müasir təhsil mühiti təqdim edir.',
    Icon: ColumnsSolid,
    iconBg: '#14315120',
    iconColor: '#1f487a'
  },
  {
    title: 'Tələbə Həyatı və Fəaliyyətlər',
    description: 'Tələbələr üçün seminarlar, yarışlar, tədbirlər və klublar təşkil olunur, aktiv sosial həyat və inkişaf imkanları təmin edilir.',
    Icon: UserSolid,
    iconBg: '#14315120',
    iconColor: '#1f487a'
  },
  {
    title: 'İxtisaslar və Təhsil Proqramları',
    description: "Mühasibatlıq, menecment, maliyyə, iqtisadiyyat üzrə ixtisaslar, tələbələrə geniş peşə seçim imkanı yaradır.",
    Icon: BriefcaseSolid,
    iconBg: '#14315120',
    iconColor: '#1f487a'
  },
  {
    title: 'Karyera və Praktiki İmkanlar',
    description: 'Dövlət və özəl sektorda iş imkanları, təcrübə proqramları və karyera dəstəyi ilə tələbələrə uğur qazandırır.',
    Icon: GlobeSolid,
    iconBg: '#14315120',
    iconColor: '#1f487a'
  },
  {
    title: 'Tədqiqat və İnkişaf',
    description: 'Tələbələr elmi araşdırmalarda və innovativ layihələrdə iştirak edərək analitik və tənqidi düşüncə bacarıqlarını inkişaf etdirir.',
    Icon: FlaskSolid,
    iconBg: '#14315120',
    iconColor: '#1f487a'
  }
]

export default function InfoCards() {
  return (
    <Box px="10%" pb={12}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {cards.map((card, index) => (
          <Box
            key={index}
            bg="white"
            p={6}
            borderRadius="xl"
            border="1px solid #C1CAD6"
            position="relative"
            transition="transform 0.2s"

          >
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="lg"
              p={2}
              bg={card.iconBg}
              mb={4}
            >
              <card.Icon 
                width={24} 
                height={24} 
                style={{ color: card.iconColor }}
              />
            </Box>
            <Text fontSize="xl" fontWeight="bold" mb={2} color="gray.800">
              {card.title}
            </Text>
            <Text color="gray.600" fontSize="sm">
              {card.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
