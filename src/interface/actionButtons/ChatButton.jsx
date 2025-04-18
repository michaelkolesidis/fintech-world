import chatIcon from './icons/chat.png';
import useGame from '../../stores/useGame.js';

export default function ChatButton() {
  const isChatting = useGame((state) => state.isChatting);
  const toggleIsChatting = useGame((state) => state.toggleIsChatting);

  const handleClick = () => {
    toggleIsChatting();
  };

  return (
    <>
      <div className="action-button" onClick={handleClick}>
        <img className="button-icon" src={chatIcon} />
      </div>
    </>
  );
}
