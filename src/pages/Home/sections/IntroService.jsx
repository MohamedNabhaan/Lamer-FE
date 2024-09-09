import { 
    Flex,
    Image,
    Box,
    Heading,
    Center,
    Container,
    Stack } from "@chakra-ui/react";

import { SERVICES } from "../../../index.js";

export default function IntroServices (){
    
    return (

        
            <Container maxW={{base:'container.sm',md:'100%'}} overflow={'hidden'} paddingTop={8} paddingBottom={12}  m={0} w={'100%'} >
                <Center paddingBlockEnd={12}>
                <Heading textColor={'brand.400'}>Our Services</Heading>
                </Center>
                
                <Stack direction={'row'} display={'flex'} spacing={10} flexWrap={{base:"wrap", lg:"nowrap"}} paddingInline={{base:0, md:56}}>
                    {SERVICES.map((service)=>(
                        <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} w='100%' paddingBlockStart={4}>

                            <Image border={"solid"} borderColor={'design.100'} borderRadius={'50%'} boxSize={'auto'} h={"100%"} src={service.img}/>
                            
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