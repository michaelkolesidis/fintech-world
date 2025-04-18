import useGame from '../../stores/useGame.js';
import Home from './Home.jsx';
import Qr from './Qr.jsx';
import Amount from './Amount.jsx';
import Payment from './Payment.jsx';
import Success from './Success.jsx';

export default function Phone() {
  const phone = useGame((state) => state.phone);
  const togglePhone = useGame((state) => state.togglePhone);

  const screen = useGame((state) => state.screen);
  const changeScreen = useGame((state) => state.changeScreen);

  const qrScanned = useGame((state) => state.qrScanned);

  const renderContent = (value) => {
    if (value === 'home') {
      return <Home />;
    } else if (value === 'browser') {
      if (qrScanned == false) {
        return <Qr />;
      } else {
        return <Amount />;
      }
    } else if (value === 'payment') {
      return <Payment />;
    } else if (value === 'success') {
      return <Success />;
    } else {
      return <p>ERROR</p>;
    }
  };

  return (
    <div className="phone">
      <div className="overlay"></div>
      <img
        className="hand"
        src="./images/hand.png"
        alt="hand holding a smartphone"
      />
      <img
        className="closeButton"
        src="./buttons/close_button.png"
        alt="close button"
        onClick={() => {
          togglePhone();
          changeScreen('home');
        }}
      />
      <div className="screen">{renderContent(screen)}</div>
    </div>
  );
}
