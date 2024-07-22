"use client";
import React, { useEffect, useRef , useState} from "react";
import { VideoCameraIcon, MicrophoneIcon,NoSymbolIcon,VideoCameraSlashIcon } from '@heroicons/react/24/solid';
import { useApp } from "@/context/AppProvider";

const UserMedia = () => {
  const {isAudioOn,isVideoOn,toggleAudio,toggleVideo} = useApp();
  const [stream, setStream] = useState<MediaStream | null>(null);
  // const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const initMedia = async () => {
      if (isAudioOn || isVideoOn) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: isAudioOn, video: isVideoOn });
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          const audioStream = new MediaStream(mediaStream.getAudioTracks());
          if (audioRef.current) {
            audioRef.current.srcObject = audioStream;
            audioRef.current.play().catch((e) => console.error("Error playing audio:", e));
          }
        } catch (err) {
          // console.error(`${err.name}: ${err.message}`);
          console.error(err);
        }
      } else if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    };

    initMedia();
  }, [isAudioOn, isVideoOn]);


  // const handleSpeechRecognition = async () => {
  //   toggleAudio();
  //   try {
  //     if (!recognition) {
  //       const newRecognition = startSpeechRecognition();
  //       setRecognition(newRecognition);
  //     } else {
  //       recognition.stop();
  //       setRecognition(null);
  //     }
  //   } catch (error) {
  //     console.error("Error in speech recognition:", error);
  //   }
  // };

  return (
    <div className="relative h-full rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />
      {!isVideoOn && (
        <div className="absolute inset-0 bg-gray-800 dark:bg-gray-900 flex items-center justify-center">
          <span className="text-white text-2xl">Video Off</span>
        </div>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-4">
        <button
          onClick={toggleVideo}
          className={`p-2 rounded-full ${isVideoOn ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
        >
          {isVideoOn ? <VideoCameraIcon className="w-6 h-6" /> : <VideoCameraSlashIcon className="w-6 h-6" />}
        </button>
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-full ${isAudioOn ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
        >
          {isAudioOn ? <MicrophoneIcon className="w-6 h-6" /> : <NoSymbolIcon className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default UserMedia