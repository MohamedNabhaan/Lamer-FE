import { Flex,Container,Stack,Box,Image, Center,keyframes, Heading } from "@chakra-ui/react";
// import logo from "../../../assets/clients"

import {CLIENTS} from "../../../index.js"




const autoScroll = keyframes`
    from{
    
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }

`;


export default function Clients (){
    const scrollAnimation= `${autoScroll} infinite 50s linear`;
    return (
        <Container maxW={{base:'container.sm',md:'container.xl'}} p={0}marginBlockEnd={20} height={'40vh'}> 
            <Heading color={'brand.400'} textAlign={'center'} padding={15} marginBlockEnd={10}>Some Clients We Have Worked With</Heading>
            <Box overflow={'hidden'} position={'relative'} display={'flex'} flexDirection={'row'} flexWrap={'nowrap'} justifyContent={'flex-start'} alignItems={'center'} marginBlock={10}> 
                <Box h={'100%'} w={'max-content'} animation={scrollAnimation}flexShrink={'0'} display={'inline-block'} flexDirection={'row'} flexWrap={'nowrap'} justifyContent={'space-between'} alignItems={'center'}>
                    <Flex  direction={'row'}justifyContent={'space-evenly'}> 
                    {CLIENTS.map((image)=>(
                            <Image key={image} height='4em' w='auto' src={image} marginInline={12}/>
                        ))}
                    </Flex>
                </Box>
                <Box h={'100%'} w={'max-content'} animation={scrollAnimation} flexShrink={'0'} display={'inline-block'} flexDirection={'row'} flexWrap={'nowrap'} justifyContent={'space-between'} alignItems={'center'} >   
                    <Flex direction={'row'} justifyContent={'space-evenly'}> 
                        {CLIENTS.map((image)=>(
                            <Image key={image} height='4em' w='auto' src={image} marginInline={12}/>
                        ))}
                        
                    </Flex> 
                </Box>
                <Box position={'absolute'}w={'auto'} height={'auto'} z-index={1} inset='0 0' bgImage='linear(to-r, white 0%,whiteAlpha.50 7.5% 92.5%, white 100% )'></Box>
            </Box>
        </Container>
    );
}