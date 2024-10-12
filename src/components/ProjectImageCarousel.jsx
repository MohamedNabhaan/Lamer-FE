import { Image, Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import Slider from "react-slick";
import fallback from "../assets/logo.png";

export default function ProjectImageCarousel(props) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  });

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
        {props.images.map((image) => {
          return (
            <Image
              w={"auto"}
              height={{ base: "200px", md: "400px" }}
              src={image}
              fallbackSrc={fallback}
            ></Image>
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
        {props.images.map((image) => {
          return (
            <Image height={"20vh"} src={image} fallbackSrc={fallback}></Image>
          );
        })}
      </Slider>
    </Box>
  );
}
