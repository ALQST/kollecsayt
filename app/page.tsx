import { Box } from '@chakra-ui/react'

// This page is statically generated at build time
export const dynamic = 'force-static';
import NewsHeader from './components/NewsHeader'
import HeroSection from './components/HeroSection'
import InfoCards from './components/InfoCards'
import InfoCardsHeader from './components/InfoCardsHeader'
import EventsAndAnnouncements from './components/EventsAndAnnouncements'
import AppLayout from './components/AppLayout'
import PageTemplate from './components/PageTemplate';

export default function Home() {
  return (
    <AppLayout>
      <Box as="main">
        <NewsHeader />
        <HeroSection />
        <InfoCardsHeader />
        <InfoCards />
        <EventsAndAnnouncements />
      </Box>
    </AppLayout>
  )
}