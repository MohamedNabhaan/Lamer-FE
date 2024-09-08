import { Stack, HStack, Link, Divider, Image, IconButton, Box} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import logo from "../assets/logo3.png"
import Wave from 'react-wavify';

const links = ['Services','Projects','Clients','About Us','Our Team','Career','Contact Us'];
const accounts = [
  {
    url: 'https://github.com/MA-Ahmad/templateskart',
    label: 'Github Account',
    type: 'gray',
    icon: <FaGithub />
  },
  {
    url: 'https://twitter.com/muhammad_ahmaad',
    label: 'Twitter Account',
    type: 'twitter',
    icon: <FaTwitter />
  },
  {
    url: 'https://linkedin.com/in/muhammad-ahmad20',
    label: 'LinkedIn Account',
    type: 'linkedin',
    icon: <FaLinkedin />
  }
];

const Footer = () => {
  return (
    <Box bgGradient='linear(to-b,whiteAlpha.50 10%,brand.400 50%,brand.400 90%)' marginBlockStart={10} bottom={0}>
    <Wave fill='#435BA1'
        paused={false}
        style={{ display: 'flex', position:'absolute'}}
        opacity={1}
        options={{
          height: 15,
          amplitude: 15,
          speed: 0.2,
          points: 4
        }}/>
        <Wave fill='#435BA1'
        paused={false}
        style={{ display: 'flex', position:'absolute'}}
        opacity={0.7}
        options={{
          height: 5,
          amplitude: 25,
          speed: 0.15,
          points: 5
        }}/>
        <Wave fill='#435BA1'
        paused={false}
        style={{ display: 'flex', position:'absolute'}}
        opacity={0.5}
        options={{
          height: 4,
          amplitude: 30,
          speed: 0.1,
          points: 6
        }}/>
    <Stack
      paddingBlock={8}
      marginInline={8}
      position={'relative'}
      spacing={{ base: 0, md: 0 }}
      justifyContent="space-between"
      alignItems="center"
      direction={{ base: 'row', md: 'row' }}
      overflow={'hidden'}
      
    >
      


      {/* Desktop Screen */}
      <HStack spacing={4} alignItems="center" display={{ base: 'none', md: 'flex' }} paddingBlock={4}>
        {links.map((link, index) => (
          <CustomLink key={index}>{link}</CustomLink>
        ))}
      </HStack>

      {/* Mobile and Tablet Screens */}
      <Stack display={{ base: 'flex', md: 'none',lg:'none' }}  >
        <Stack direction={'row'} alignItems="center">
          <CustomLink>Services</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink>Projects</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink>Clients</CustomLink>
        </Stack>
        <Stack direction={'row'} alignItems="center">
          <CustomLink>About Us</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink>Our Team</CustomLink>
        </Stack>
        <CustomLink>Contact Us!</CustomLink>
      </Stack>

      8
      <Stack direction={{base:'column', md:'row'}} spacing={5} pt={{ base: 6 , md: 4 }} alignItems="center" flexWrap={{base:'wrap', md:'nowrap'}} w='30%'>
        {accounts.map((sc, index) => (
          <IconButton
            key={index}
            as={Link}
            isExternal
            href={sc.url}
            aria-label={sc.label}
            colorScheme={sc.type}
            icon={sc.icon}
            rounded="md"
            size={{base:'sm',md:'lg'}}
          />
        ))}
      </Stack>
    </Stack>
    </Box>
    
  );
};

const CustomLink = ({ children, ...props }) => {
  return (
    <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
      {children}
    </Link>
  );
}

export default Footer;