import { Carousel, IconButton } from "@material-tailwind/react";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

/**
 * A custom carousel component that displays images in a carousel. It uses the Carousel component from the Material Tailwind library to display the images.
 * It uses the FaArrowAltCircleLeft and FaArrowAltCircleRight icons from the react-icons/fa library to display the previous and next arrows.
 * @param {Array} media - An array of objects containing image URLs and alt text.
 * @returns  {JSX.Element}
 * @example
 * <CustomCarousel media={media} />
 */

const CustomCarousel = ({ media }) => {
  return (
    <Carousel
      className="rounded-xl border-2 border-primary"
      prevArrow={
        media?.length > 1
          ? ({ handlePrev }) => (
              <IconButton variant="text" color="white" size="lg" onClick={handlePrev} className="!absolute top-2/4 left-4 -translate-y-2/4">
                <FaArrowAltCircleLeft className="text-4xl text-tertiary bg-white rounded-full" />
              </IconButton>
            )
          : null
      }
      nextArrow={
        media?.length > 1
          ? ({ handleNext }) => (
              <IconButton variant="text" color="white" size="lg" onClick={handleNext} className="!absolute top-2/4 !right-4 -translate-y-2/4">
                <FaArrowAltCircleRight className="text-4xl text-tertiary bg-white rounded-full" />
              </IconButton>
            )
          : null
      }
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span key={i} className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-primary" : "w-4 bg-tertiary"}`} onClick={() => setActiveIndex(i)} />
          ))}
        </div>
      )}
    >
      {media.map((image) => (
        <img src={image.url} alt={image.alt} key={image.url} className="h-[430px] md:h-[600px]  max-w-7xl  w-full m-auto object-cover md:object-contain" />
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
