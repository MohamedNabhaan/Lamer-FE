import {
  Image,
  Box,
  Center,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ImageOff } from "lucide-react";

export default function ProjectImageCarousel(props) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  const iconBg = useColorModeValue("gray.100", "gray.600");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  });

  // Component for when no image is available
  const NoImageFallback = ({ height }) => (
    <Center
      width="100%"
      height={height}
      bg={iconBg}
      flexDirection="column"
      gap={2}
    >
      <Icon as={ImageOff} w={12} h={12} color={iconColor} />
      <Text fontSize="sm" color={iconColor} textAlign="center">
        No Image Available
      </Text>
    </Center>
  );

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box>
      <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
        {props.images.map((image, index) => {
          return (
            <Box key={index}>
              {image && image !== "" ? (
                <Image
                  w={"auto"}
                  height={{ base: "200px", md: "400px" }}
                  src={image}
                  objectFit="cover"
                />
              ) : (
                <NoImageFallback height={{ base: "200px", md: "400px" }} />
              )}
            </Box>
          );
        })}
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={2}
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
        infinite={false}
      >
        {props.images.map((image, index) => {
          return (
            <Box key={index} p={1}>
              {image && image !== "" ? (
                <Image height={"20vh"} src={image} objectFit="cover" />
              ) : (
                <NoImageFallback height="20vh" />
              )}
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
}
