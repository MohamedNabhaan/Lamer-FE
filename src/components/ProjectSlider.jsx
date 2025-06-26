import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Image, useBreakpointValue } from "@chakra-ui/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ocean from "../assets/ocean.jpg";

export default function ProjectSlider({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Responsive height values
  const sliderHeight = useBreakpointValue({
    base: "40vh", // Mobile: smaller height
    sm: "45vh", // Small screens
    md: "55vh", // Medium screens
    lg: "70vh", // Large screens: original height
  });

  // Responsive thumbnail settings
  const thumbnailSlidesPerView = useBreakpointValue({
    base: Math.min(images.length, 3), // Mobile: max 3 thumbnails
    sm: Math.min(images.length, 4), // Small: max 4 thumbnails
    md: images.length > 2 ? Math.round(images.length / 2) : 2, // Medium+: original logic
  });

  return (
    <>
      <Box height={sliderHeight}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            height: "75%", // Main slider takes 75% of container
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt={`Project image ${index + 1}`}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  borderRadius={{ base: "md", md: "lg" }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Thumbnail Swiper */}
        <Box mt={2} height="25%">
          {" "}
          {/* Thumbnails take 25% of container */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={thumbnailSlidesPerView}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            style={{ height: "100%" }}
          >
            {images.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    borderRadius={{ base: "sm", md: "md" }}
                    cursor="pointer"
                    opacity={0.7}
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.2s"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </>
  );
}
