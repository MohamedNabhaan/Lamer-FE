import { Box, Center, Image } from "@chakra-ui/react";
import pic from "../../../assets/Introduction/quarry.jpeg"


export default function Introduction (){
    return (
        <Box overflow={"hidden"} >
        <Center>
            <Box w='100%'>
                <Image w='100%' height={'780px'}  src={pic}></Image>
                
           </Box>
        </Center>
        </Box>
    );
}