import { useEffect, useState } from "react";
import { Howl } from "howler";
import useGame from "../stores/useGame.js";
import Phone from "./phone/Phone.jsx";
import Instructions from "./instructions/Instructions.jsx";
import ChatButton from "./actionButtons/ChatButton.jsx";
import ScanButton from "./actionButtons/ScanButton.jsx";

export default function Interface() {
  const sound = useGame((state) => state.sound);
  const toggleSound = useGame((state) => state.toggleSound);
  const playing = useGame((state) => state.playing);
  const togglePlaying = useGame((state) => state.togglePlaying);
  const phone = useGame((state) => state.phone);
  const togglePhone = useGame((state) => state.togglePhone);
  const isNearNpc = useGame((state) => state.isNearNpc);
  const isNearArcade = useGame((state) => state.isNearArcade);
  const qrScanned = useGame((state) => state.qrScanned);
  const isChatting = useGame((state) => state.isChatting);
  const instructionsShown = useGame((state) => state.instructionsShown);
  const hideInstructions = useGame((state) => state.hideInstructions);

  useEffect(() => {
    setTimeout(() => {
      hideInstructions();
    }, 12000);
  }, []);

  /**
   * Sound
   */
  const [soundtrack] = useState(
    () =>
      new Howl({
        src: ["./sound/moonlight_beach.mp3"],
        loop: true,
        html5: true,
      })
  );

  if (sound === true && playing === false) {
    soundtrack.play();
    togglePlaying();
  } else if (sound === false && playing === true) {
    soundtrack.stop();
    togglePlaying();
  }

  return (
    <>
      {!phone && (
        <>
          {/* Logo */}
          <div className="logo">
            <span className="fintech">FINTECH</span>
            <br />
            WORLD
          </div>
          {/* Control Buttons (top-right) */}
          <div className="control-buttons">
            <div className="control-button" id="sound" onClick={toggleSound}>
              {sound ? (
                <img src="./icons/sound_on.svg" />
              ) : (
                <img src="./icons/sound_off.svg" />
              )}
            </div>
            <div className="control-button" id="menu">
              <img src="./icons/menu.svg" />
            </div>
          </div>
          {/* Phone Tumbnail Area (bottom-right) */}
          <div className="phone-thumbnail-area" onClick={togglePhone}>
            <img
              className="phone-thumbnail"
              src="./images/phone_small.png"
              alt="phone thumbnail"
            />
            <div className="phone-shadow"></div>
            <div className="phone-thumbnail-area-background"></div>
          </div>
          {isNearNpc && !isChatting && <ChatButton />}
          {isNearArcade && !qrScanned && <ScanButton />}
          {/* Instructions */}
          {instructionsShown && <Instructions />}
        </>
      )}
      {/* Hand with Phone */}
      {phone && <Phone />}
    </>
  );
}
