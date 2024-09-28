// import {
//   AvatarCreator,
//   AvatarCreatorConfig,
//   AvatarExportedEvent,
// } from "@readyplayerme/react-avatar-creator";
import { Avatar } from "@readyplayerme/visage";
// import { useState } from "react";

// const config: AvatarCreatorConfig = {
//   clearCache: true,
//   bodyType: "halfbody",
//   quickStart: false,
//   language: "en",
// };

// shadows={true}
// ambientOcclusion={true}
// headMovement={true}
// ambientLightColor="#fff5b6"
// ambientLightIntensity={0.25}
// lockVertical={true}
// poseSrc={"/visage/male-pose-standing.glb"}
// bloom={{
//   intensity: 0.1,
//   kernelSize: 1,
//   luminanceSmoothing: 1,
//   luminanceThreshold: 1,
//   materialIntensity: 3.3,
//   mipmapBlur: true
// }}
// environment="hub"
// fov={40}

// onLoaded={function noRefCheck(){}}
// onLoading={function noRefCheck(){}}
// emotion={{
//   "eyeSquintLeft": 0.4,
//   "eyeSquintRight": 0.2,
//   "mouthSmileLeft": 0.37,
//   "mouthSmileRight": 0.36,
//   "mouthShrugUpper": 0.27,
//   "browInnerUp": 0.3,
//   "browOuterUpLeft": 0.37,
//   "browOuterUpRight": 0.49
// }}
// dpr={2}
// scale={0.7}
// cameraInitialDistance={1.2}
// cameraTarget={1.15}
// idleRotation={false}
// spotLightAngle={0.314}
// spotLightColor="#fff5b6"

// https://models.readyplayer.me/667bfabb3d619cd96a159fe3.glb
export default function Avatar3D() {
  const avatarUrl =
    "https://models.readyplayer.me/667bfabb3d619cd96a159fe3.glb";
  // const style = { width: "100%", height: "100vh", border: "none" };
  // const handleOnAvatarExported = (event: AvatarExportedEvent) => {
  //   // setAvatarUrl(event.data.url);
  //   setAvatarUrl("https://models.readyplayer.me/667bfabb3d619cd96a159fe3.glb");
  // };
  return (
    <>
      {/* <AvatarCreator
        subdomain="demo"
        config={config}
        style={style}
        onAvatarExported={handleOnAvatarExported}
      /> */}
      <Avatar
        modelSrc={avatarUrl}
        halfBody
        // animations={}
        // headMovement
        activeAnimation=""
        // animationSrc={"https://models.readyplayer.me/animations/talking.glb"}
      />
    </>
  );
}
