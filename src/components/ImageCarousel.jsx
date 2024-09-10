import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Text } from "@chakra-ui/react";
import { BiDotsVertical } from "react-icons/bi";
import "../index.css";
const settings = {
  dots: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1000,
  dotsClass: "vertical-dots",
};

export default function ImageCarousel() {
  let array = ["ddddo", "dedwdwdwd", "dwedwdwedw"];
  return (
    <>
      <Box>
        <Slider {...settings}>
          {array.map((string) => (
            <Box>
              <Text>{string}</Text>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
}
