import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Text, Image, Flex, Heading, keyframes } from "@chakra-ui/react";
import "../index.css";
import { wrap } from "framer-motion";
const settings = {
  dots: true,
  arrows: false,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,

  fade: false,
  vertical: true,
  draggable: false,
  autoplay: true,
  lazyLoading: true,
  autoplaySpeed: 4500,

  dotsClass: "vertical-dots",
};

const fadeIn = keyframes`
    from{
    opacity:0;
  }
  to {
    opacity:1;
  }

`;

export default function ImageCarousel(props) {
  const fadeInAnimation = `${fadeIn} 5s`;
  return (
    <>
      <Slider {...settings}>
        {props.images.map((image) => (
          <Flex height={"80vh"} overflow={"hidden"}>
            <Text
              letterSpacing={0}
              whiteSpace={"pre-line"}
              flexWrap={"wrap"}
              fontSize={{ base: "md", md: "4xl", lg: "5xl" }}
              position={"absolute"}
              color="white"
              zIndex={999}
              paddingTop={{ base: 16, md: 24, lg: 32 }}
              paddingLeft={{ base: 10, md: 12, lg: 16 }}
            >
              {image.heading}
            </Text>
            <Text
              fontSize={{ base: "md", md: "xl", lg: "2xl" }}
              position={"absolute"}
              color={"design.300"}
              paddingTop={{ base: 20, md: 36, lg: 48 }}
              paddingLeft={{ base: 10, md: 12, lg: 20 }}
              transition={"fade"}
              transitionDuration={"600ms"}
            >
              {image.subHeading}
            </Text>
            <Image
              height={"100%"}
              width={"100%"}
              objectFit={"cover"}
              src={image.image}
            />
          </Flex>
        ))}
      </Slider>
    </>
  );
}
