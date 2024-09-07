import { 
    Flex,
    Image,
    Box,
    Heading,
    Center,
    Container,
    Stack } from "@chakra-ui/react";

import { SERVICES } from "../../../index.js";

export default function Services (){
    
    return (

        
            <Container maxW={{base:'container.sm',md:'100%'}} overflow={'hidden'} paddingTop={12} paddingBottom={4}  m={0} w={'100%'}>
                <Center paddingBlock={16}>
                <Heading textColor={'brand.400'} size={'2xl'}>Our Services</Heading>
                </Center>
                
                <Stack direction={'row'} display={'flex'} spacing={10} flexWrap={{base:"wrap", lg:"nowrap"}} paddingInline={{base:0, md:56}}>
                    {SERVICES.map((service)=>(
                        <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} w='100%' paddingBlockStart={4}>

                            <Image border={"solid"} borderColor={'blackAlpha.700'} borderRadius={'50%'} boxSize={'auto'} h={"100%"} src={service.img}/>
                            
                            <Box fontSize={'lg'}
                            h={"100%"}
                            p={2}
                            color={'blackAlpha.700'}
                            textAlign={'center'}
                            
                            >
                            {service.label}
                            </Box>
                        </Flex>
                    ))}
                </Stack>
                

           </Container>

    );
}