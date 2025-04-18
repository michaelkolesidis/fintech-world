import { npcTexts } from '../../translations/en';
import { useState, useEffect } from 'react';
import useGame from '../../stores/useGame.js';

export default function SpeechBubble() {
  const [textNumber, setTextNumber] = useState(0);

  const isChatting = useGame((state) => state.isChatting);

  const toggleIsChatting = useGame((state) => state.toggleIsChatting);

  useEffect(() => {
    function handleClick() {
      if (isChatting && textNumber < npcTexts.length) {
        setTextNumber((prevNumber) => prevNumber + 1);
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (textNumber === npcTexts.length) {
      toggleIsChatting();
    }
  }, [textNumber]);

  return (
    <>
      <div className="speech-bubble">
        <div>
          <div className="bubble">
            {npcTexts[textNumber]}
            <span className="triangle">▾</span>
          </div>
          <div className="pointer"></div>
        </div>
        <div>
          {/* <div className="bubble blurred"></div> */}
          {/* <div className="pointer blurred"></div> */}
        </div>
      </div>
    </>
  );
}
