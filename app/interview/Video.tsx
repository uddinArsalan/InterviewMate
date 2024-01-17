"use client";
import React, { useEffect, useRef , useState} from "react";
import { Button } from "@/components/ui/button";

const Video = () => {

  const VideoRef = useRef<HTMLVideoElement>(null);
  const AudioRef = useRef<HTMLAudioElement>(null);
  const [ mediaRecorders,setMediaRecorders] = useState<MediaRecorder>()
  useEffect(() => {
    let chunks: any[] = [];
    const video = VideoRef.current;
    const audio = AudioRef.current;
    if (video && audio) {
      navigator.mediaDevices
        .getUserMedia({ audio: true ,video: { width: 400, height: 200 }})
        .then((mediaStream) => {
          video.srcObject = mediaStream;
          video.muted = true;
          video.onloadedmetadata = () => {
            video.play();
          };
          const mediaRecorder = new MediaRecorder(mediaStream);
          setMediaRecorders(mediaRecorder)
          // mediaRecorder.start();
          console.log(mediaRecorder.state);
          // console.log("recorder started");

          mediaRecorder.onstop = () => {
            console.log("On Stop")
            audio.setAttribute("controls", "");
            audio.controls = true;
            console.log(chunks)
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            const audioURL = URL.createObjectURL(blob);
            console.log(audioURL.substring(5,),blob)
            audio.src = audioURL;
            console.log("recorder stopped");
            chunks = [];
          };


          mediaRecorder.ondataavailable = (e) => {
            console.log("Here om dataavailable")
            chunks.push(e.data);
          };

        })
        .catch((err) => {
          // always check for errors at the end.
          console.error(`${err.name}: ${err.message}`);
        });
    }
  }, [VideoRef, AudioRef]);
  return (
    <div className="absolute right-0 bottom-0 z-20">
      <video ref={VideoRef} autoPlay></video>
      <Button onClick={() => {mediaRecorders?.start(); VideoRef.current?.play()}} className="mr-4">Start Recording</Button>
      <Button onClick={() => {mediaRecorders?.stop();VideoRef.current?.pause()}}>Pause Recording</Button>
      <audio ref={AudioRef} src=""></audio>
    </div>
  );
};

export default Video;
