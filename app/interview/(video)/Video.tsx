"use client";
import React, { useEffect, useRef , useState} from "react";
// import { Button } from "@/components/ui/button";
import { VideoCameraIcon, MicrophoneIcon,NoSymbolIcon,VideoCameraSlashIcon } from '@heroicons/react/24/solid';

const Video = () => {
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const VideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((mediaStream) => {
        if (VideoRef.current) {
          VideoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
        const audioStream = new MediaStream(mediaStream.getAudioTracks());
        
        // Set the audio stream to the audio element
        if (audioRef.current) {
          audioRef.current.srcObject = audioStream;
          audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        }
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  }, []);

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !isAudioOn;
      setIsAudioOn(!isAudioOn);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !isVideoOn;
      setIsVideoOn(!isVideoOn);
    }
  };

  return (
    <div className="absolute w-64 h-44 right-0 bottom-0 z-20 bg-gray-100 rounded-lg shadow-lg p-3">
      <div className="relative w-full h-full">
        <video 
          ref={VideoRef} 
          className="w-full h-full rounded-lg shadow-md"
          autoPlay 
          playsInline
          muted
        />
        {!isVideoOn && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl">Video Off</span>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={toggleVideo}
          className={`p-2 rounded-full ${isVideoOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'} text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isVideoOn ? <VideoCameraIcon className="w-6 h-6" /> : <VideoCameraSlashIcon className="w-6 h-6" />}
        </button>
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-full ${isAudioOn ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-400 hover:bg-gray-500'} text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isAudioOn ? <MicrophoneIcon className="w-6 h-6" /> : <NoSymbolIcon className="w-6 h-6" />}
        </button>
      </div>
      {/* <audio ref={audioRef} controls className="mt-3 w-full" /> */}
    </div>
  );
};

export default Video