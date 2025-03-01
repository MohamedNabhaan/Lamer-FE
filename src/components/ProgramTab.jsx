import { Box, List, ListItem, Text, Heading } from "@chakra-ui/react";

export default function ProgramTab(props) {
  return (
    <>
      <Box
        paddingTop={5}
        borderInline={'solid'}
        
        bgColor={"brand.1000"}
        borderColor={'design.200'}
        borderBottomRadius={24}
      >
        <Box borderBottom={'solid'} borderColor={'design.200'}>
        <Heading color={"brand.900"} size={"xl"} paddingInline={12}>
          Programs Offered by the Center
        </Heading>
        <Heading color={"gray"} size={"md"}paddingTop={4} paddingInline={12} paddingBottom={4}> 
          If you have any questions feel free to contact us!
        </Heading>
        </Box>
        <List spacing={8} paddingTop={4} bgColor={'white'} borderBottom={'solid'} borderColor={'design.200'} paddingBottom={4} borderBottomRadius={24}>
          {props.program.map((program)=>{
            return(<ListItem paddingInline={{base:4,md:8,lg:12}} paddingBlock={2}>
              <Heading as={'h2'} size={'lg'} color={'brand.900'}>{program.title}</Heading>
              <Text color={'grey'}>Duration: {program.duration}</Text>
              <Text paddingRight={{base:0,lg:32}}>{program.desc}</Text>
              </ListItem>)
          })}
          
        </List>
      </Box>
    </>
  );
}
