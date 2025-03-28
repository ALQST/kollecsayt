'use client'

import React from 'react';
import { Box, Grid, Text, Flex, Button } from '@chakra-ui/react';
import { CalendarSolid } from '@mynaui/icons-react';
import { ArrowUpRightSquareSolid } from "@mynaui/icons-react";
import Image from 'next/image';
import NextLink from 'next/link';
import useSWR from 'swr';
import { getEvents, type WordPressPost } from '../../lib/wordpress';

const EventsHeader = () => {
  return (
    <Flex align="center" gap={3} mb={4}>
      <Box
        bg="#143151"
        p={3}
        width="60px"
        height="60px"
        borderRadius="15px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CalendarSolid width={32} height={32} style={{ color: "white" }} />
      </Box>
      <Text fontSize="2xl" fontWeight="bold" color="#111827">
        Tədbirlər
      </Text>
    </Flex>
  );
};

const FeaturedEventCard = ({ event }: { event: WordPressPost }) => {
  const imageUrl = event._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  
  return (
    <NextLink href={`/tedbirler/${event.slug}`} legacyBehavior passHref>
      <Box
        as="a"
        bg="white"
        borderRadius="xl"
        overflow="hidden"
        border="1px solid #C1CAD6"
        transition="transform 0.2s"
        height="100%"
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        _hover={{ borderColor: "#1f487a" }}

      >
        <Box 
          position="relative" 
          width={{ base: '100%', md: '50%' }}
          height={{ base: '200px', md: '400px' }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={event.title.rendered}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Flex h="100%" align="center" justify="center" bg="#F3F4F6">
              <Text color="gray.400">No image</Text>
            </Flex>
          )}
        </Box>
        
        <Box 
          p={6} 
          width={{ base: '100%', md: '50%' }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text
            fontSize="sm"
            color="gray.500"
            mb={2}
          >
            {new Date(event.date).toLocaleDateString('az-AZ', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            })}
          </Text>
          <Text
            fontSize="xl"
            fontWeight="bold"
            mb={4}
            color="#111827"
          >
            {event.title.rendered}
          </Text>
          {event.excerpt?.rendered && (
            <Text
              fontSize="sm"
              color="gray.600"
              noOfLines={4}
              dangerouslySetInnerHTML={{ __html: event.excerpt.rendered }}
            />
          )}
          <Flex mt="auto" justify="flex-end">
            <Button
              variant="link"
              color="#143151"
              p={2}
              borderRadius="md"
              _hover={{ bg: "#eaeaeb" }}
            >
              <Flex align="center" gap={1}>
                Ətraflı
                <ArrowUpRightSquareSolid width={32} height={32} />
              </Flex>
            </Button>
          </Flex>
        </Box>
      </Box>
    </NextLink>
  );
};

const SmallEventCard = ({ event }: { event: WordPressPost }) => {
  const imageUrl = event._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  
  return (
    <NextLink href={`/tedbirler/${event.slug}`} legacyBehavior passHref>
      <Box
        as="a"
        bg="white"
        borderRadius="xl"
        overflow="hidden"
        border="1px solid #C1CAD6"
        transition="transform 0.2s"
        height="190px"
        position="relative"
        _hover={{ borderColor: "#1f487a" }}
      >
        <Box position="relative" h="120px" bg="#F3F4F6">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={event.title.rendered}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Flex h="100%" align="center" justify="center">
              <Text color="gray.400">No image</Text>
            </Flex>
          )}
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="white"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
          >
            {new Date(event.date).toLocaleDateString('az-AZ', {
              day: 'numeric',
              month: 'short'
            }).toUpperCase()}
          </Box>
        </Box>
        <Box p={3}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            noOfLines={2}
            color="#111827"
          >
            {event.title.rendered}
          </Text>
        </Box>
      </Box>
    </NextLink>
  );
};

const PlaceholderEventCard = () => {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid #E5E7EB"
      height="190px"
      position="relative"
    >
      <Box position="relative" h="120px" bg="#F3F4F6">
        <Flex h="100%" align="center" justify="center">
          <Text color="gray.400">No image</Text>
        </Flex>
        <Box
          position="absolute"
          top={2}
          right={2}
          bg="white"
          px={2}
          py={1}
          borderRadius="md"
          fontSize="xs"
          color="gray.400"
        >
          N/A
        </Box>
      </Box>
      <Box p={3}>
        <Box h="20px" w="80%" bg="#F3F4F6" borderRadius="md" mb={2} />
        <Box h="20px" w="60%" bg="#F3F4F6" borderRadius="md" />
      </Box>
    </Box>
  );
};

const Events = () => {
  const { data: events = [], error } = useSWR<WordPressPost[]>('wp-events', getEvents);

  if (error) {
    console.error('Error loading events:', error);
    return (
      <Box>
        <EventsHeader />
        <Text color="red.500">Error loading events: {error.message}</Text>
      </Box>
    );
  }

  const [firstEvent, ...otherEvents] = events;
  const placeholdersNeeded = Math.max(0, 4 - otherEvents.length);
  const placeholders = Array(placeholdersNeeded).fill(null);

  return (
    <Box>
      <EventsHeader />
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={6}
      >
        {firstEvent ? (
          <FeaturedEventCard event={firstEvent} />
        ) : (
          <Box
            bg="white"
            borderRadius="xl"
            overflow="hidden"
            border="1px solid #C1CAD6"
            height="400px"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Box 
              position="relative" 
              width={{ base: '100%', md: '50%' }}
              height={{ base: '200px', md: '400px' }}
              bg="#F3F4F6"
            />
            <Box 
              p={6} 
              width={{ base: '100%', md: '50%' }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box h="24px" w="40%" bg="#F3F4F6" borderRadius="md" mb={2} />
              <Box h="32px" w="80%" bg="#F3F4F6" borderRadius="md" mb={4} />
              <Box h="80px" w="100%" bg="#F3F4F6" borderRadius="md" />
              <Flex mt="auto" justify="flex-end">
                <Box h="24px" w="80px" bg="#F3F4F6" borderRadius="md" />
              </Flex>
            </Box>
          </Box>
        )}
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={4}
        >
          {otherEvents.map((event) => (
            <SmallEventCard key={event.id} event={event} />
          ))}
          {placeholders.map((_, index) => (
            <PlaceholderEventCard key={`placeholder-${index}`} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Events;
