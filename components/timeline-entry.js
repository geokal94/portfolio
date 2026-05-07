import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

const TimelineEntry = ({ years, role, company, sub, last = false }) => {
  const borderColor = useColorModeValue('borderLight', 'borderDark')
  const muted = useColorModeValue('mutedLight', 'mutedDark')

  return (
    <Flex gap={5} pb={last ? 0 : 5}>
      <Box minW="92px" color={muted} fontSize="sm" pt="2px">
        {years}
      </Box>
      <Box
        borderLeftWidth={last ? '0' : '1px'}
        borderLeftColor={borderColor}
        pl={5}
        flex={1}
        position="relative"
      >
        <Box
          position="absolute"
          left="-5px"
          top="6px"
          w="9px"
          h="9px"
          borderRadius="full"
          bg="accent"
        />
        <Box fontWeight={500}>{role}</Box>
        <Box color={muted} fontSize="sm">
          {company}
        </Box>
        {sub && (
          <Box mt={2} fontSize="xs" color={muted}>
            {sub}
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export default TimelineEntry
