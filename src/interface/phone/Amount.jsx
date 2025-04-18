import useGame from '../../stores/useGame.js';
import Browser from './Browser';
import Header from './Header';
import coinIcon from './icons/coin.png';

export default function Amount() {
  const changeScreen = useGame((state) => state.changeScreen);

  return (
    <div className="app">
      <Browser />
      <Header />
      <div className="page-content">
        <div className="form-text">Amount to Top Up</div>
        <div className="form-field">
          10 <img className="coin-icon" src={coinIcon} alt="coin icon" />
        </div>
        <div className="form-text">Mobile Number</div>
        <div className="form-field">0123456789</div>
        <div className="form-button" onClick={() => changeScreen('payment')}>
          Continue
        </div>
      </div>
    </div>
  );
}
