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

        
            <Container as="section" maxW={'container.xl'}>
                <Center paddingBlock={12}>
                <Heading size={'2xl'}>Our Services</Heading>
                </Center>
                
                <Stack direction={'row'} display={'flex'} spacing={10} flexWrap={{base:"wrap", md:"nowrap"}}>
                    {SERVICES.map((service)=>(
                        <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} w='100%' marginBlockStart={0}>

                            <Image boxSize={'auto'} h={"100%"} src={service.img}/>
                            <Box fontSize={'lg'}
                            h={"100%"}
                            p={2}
                            color={'black'}
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