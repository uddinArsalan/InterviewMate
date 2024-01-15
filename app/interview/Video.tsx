'use client'
import React,{useEffect, useRef} from 'react';

const Video = () => {
  const VideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = VideoRef.current
    if(video){
        navigator.mediaDevices.getUserMedia({audio: true, video: {width : 400 ,height : 200}}).then((mediaStream) => {
            video.srcObject = mediaStream;
            video.onloadedmetadata = () => {
                video.play();
              };
        }).catch((err) => {
            // always check for errors at the end.
            console.error(`${err.name}: ${err.message}`);
          });;
    }
  },[VideoRef])
  return (
    <div className='absolute right-0 bottom-0 z-20'>
        <video ref={VideoRef} autoPlay></video>
    </div>
  )
}

export default Video