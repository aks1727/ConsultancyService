import { Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
function AdminHome() {


  return (
    <Flex w={'full'} alignItems={'center'} justifyContent={'center'}>
        <Text id='welcome' fontSize={'4xl'} fontWeight={'bolder'}>
        Welcome to admin portal
        </Text>
    </Flex>
  )
}

export default AdminHome
