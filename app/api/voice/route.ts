// import the playht SDK
// import * as PlayHT from "playht";
// import { SpeechStreamOptions } from "playht";

// // Initialize PlayHT API with your credentials
// const PLAYHT_API_KEY = process.env.PLAYHT_API_KEY;
// const PLAYHT_USER_ID = process.env.PLAYHT_USER_ID;

// console.log(PLAYHT_API_KEY , PLAYHT_USER_ID)

// export async function GET() {
//   if (PLAYHT_API_KEY && PLAYHT_USER_ID) {
//     PlayHT.init({
//       apiKey: PLAYHT_API_KEY,
//       userId: PLAYHT_USER_ID,
//     });
//     // configure your stream
//     const streamingOptions : SpeechStreamOptions = {
//       // must use turbo for the best latency
//       voiceEngine: "PlayHT2.0-turbo",
//       // this voice id can be one of our prebuilt voices or your own voice clone id, refer to the`listVoices()` method for a list of supported voices.
//       voiceId:
//         "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
//       // you can pass any value between 8000 and 48000, 24000 is default
//       sampleRate: 24000,
//       // the generated audio encoding, supports 'raw' | 'mp3' | 'wav' | 'ogg' | 'flac' | 'mulaw'
//       outputFormat: "mp3",
//       // playback rate of generated speech
//       speed: 1,
//     };

//     // start streaming!
//     const text =
//       "Hey";
//     const stream = await PlayHT.stream(text, streamingOptions);

//     stream.on("data", (chunk) => {
//         console.log(chunk)
//       // Do whatever you want with the stream, you could save it to a file, stream it in realtime to the browser or app, or to a telephony system
//     });
//   }
// }
