import { useToast, Box, Heading, Container, Text,FormControl,FormLabel,Input, FormErrorMessage,Textarea, Select, Flex, Button, FormHelperText } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { COUNTRIES } from "../..";
import { useState } from "react";
import * as Yup from 'yup';

export default function ContactUs() {
  const [contactInfo,setContactInfo] = useState({
    fullName: '',
    email: '',
    callcode:'+960',
    number:'',
    message: ''
  })
  const [value, setValue] = useState()
  const [errors,setErrors] = useState({})
  const toast= useToast()
  
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Name is required.'),
    email: Yup.string().required('Email is required'),
    number: Yup.string().required('Contact Number is required').min(7,'Contact number must atleast 7 digits').max(15,'Contact Number cannot be more than 15 digits'),
    message: Yup.string().required('Message is required')
  })

  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target;
    setContactInfo(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
   
   const newErrors= {};
    setErrors({})
    try {
      await validationSchema.validate(contactInfo,{abortEarly:false})
      
    }
    catch (error){
      
      error.inner.forEach((err)=>{
        newErrors[err.path]= err.message;
        
      })
      setErrors(newErrors)
      console.log(newErrors)
    }

    if (Object.keys(errors).length === 0) {
      const sendFormData = new FormData();
    sendFormData.append('name',event.target[0].value);
    sendFormData.append('email',event.target[1].value);
    sendFormData.append('contactNumber',`${event.target[2].value}`+`${event.target[3].value}`);
    sendFormData.append('message',event.target[4].value);

    sendFormData.append("access_key", "184697bb-2f61-48d2-8379-6a373900d5a6");
    const object2 = Object.fromEntries(sendFormData);
    const json = JSON.stringify(object2);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());
    toast({
      title:'Form Submitted',
      description:'We have recieved your message and will reply as soon as possible',
      duration:5000,
      isClosable:true
    });
    setContactInfo({
      fullName: '',
      email: '',
      callcode:'+960',
      number:'',
      message: ''
    })
    }
   
    
    
  }
  
  return (
    <Box minH={"72vh"}>
      <Container
        maxW={"container.xl"}
        paddingTop={12}
        paddingLeft={20}
        paddingBottom={8}
        borderBottom={"solid"}
        borderColor={"design.100"}
        justifyContent={"center"}
      >
        <Heading
          borderLeft={"solid 20px"}
          as="h1"
          size={"3xl"}
          fontWeight={500}
          color={"brand.400"}
          display={"block"}
          paddingLeft={2}
          textAlign={{ base: "center", md: "left" }}
        >
          Contact Our Team
        </Heading>
        <Box paddingTop={8} w={"80%"}>
          <Text fontSize={"xl"}>
            Let us know how we can help you.
          </Text>
          <Text fontSize={"xl"} paddingBottom={2}>
            Our team will respond to you as soon as possible.
          </Text>
        </Box>
      </Container>
      <Flex paddingBottom={6} justifyContent={'center'}>
        <Box w={'50%'} paddingBlock={6}>
        <Form onSubmit={onSubmit} method="post"
            encType="multipart/form-data">
              
              <FormControl isInvalid={errors.name!== undefined? true:false} paddingBlock={4} >
              <FormLabel paddingTop={2}>Full name</FormLabel>
              <Input
                value={contactInfo.fullName} 
                onChange={handleChange} 
                isRequired={true}
                type="text"
                name="fullName"
                placeholder="Full name"
              ></Input>
              <FormHelperText>eg: John Doe</FormHelperText>
              {  errors.name!== undefined? <FormErrorMessage>{errors.name}</FormErrorMessage>:""}
            </FormControl>
            <FormControl isInvalid={errors.email!== undefined? true:false} paddingBottom={2}>
              <FormLabel paddingTop={2}>Email</FormLabel>
              <Input
              value={contactInfo.email} 
              onChange={handleChange} 
                isRequired={true}
                type="text"
                name="email"
                placeholder="Email"
              ></Input>
              <FormHelperText>eg: you@company.com</FormHelperText>
              {errors.email!== undefined? <FormErrorMessage>{errors.email}</FormErrorMessage>:""}
            </FormControl>
            <FormControl isInvalid={errors.contactNumber!== undefined? true:false} paddingBottom={2}>
              <FormLabel paddingTop={2}>Contact number</FormLabel>
              <Flex flexDir={'row'} gap={1}>
              <Select isRequired={true} w={'10%'} name="callcode" value={contactInfo.callcode} 
                onChange={handleChange} >
              {COUNTRIES.map((country)=>{return(<option value={country.dial_code} >{country.code} {country.dial_code}</option>)})}
              </Select>
              <Input value={contactInfo.number} 
                onChange={handleChange}  isRequired={true} w={'90%'} type='number' name="number" placeholder="XXXXXXX"></Input>
              </Flex>
              <FormHelperText>eg: +960 9933954</FormHelperText>
              {  errors.contactNumber!== undefined? <FormErrorMessage>{errors.contactNumber}</FormErrorMessage>:""}
            </FormControl >
            <FormControl isInvalid={errors.message!== undefined? true:false} paddingBottom={2}>
              <FormLabel paddingTop={2}>Message</FormLabel>
              <Textarea
              value={contactInfo.message} 
              onChange={handleChange} 
                isRequired={true}
                type="text"
                name="message"
                placeholder="Message..."
              ></Textarea>
              {  errors.message!== undefined? <FormErrorMessage>{errors.message}</FormErrorMessage>:""}
            </FormControl>
            <Button type="submit">Submit</Button>
        </Form>
        </Box>
      </Flex>
    </Box>
  );
}



