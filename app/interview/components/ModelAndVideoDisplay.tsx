import React from 'react';
import Image from "next/image";
import Video from '../(video)/Video';

const ModelAndVideoDisplay = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center relative">
          <Image
            src={`https://source.unsplash.com/1200x600/?interview&n=${Date.now()}/`}
            className="md:object-cover object-contain"
            alt="interview-section"
            width={1200}
            height={300}
          ></Image>
          {/* <Video /> */}
        </div>
  )
}

export default ModelAndVideoDisplay