import useGame from '../../stores/useGame.js';
import Browser from './Browser';
import Header from './Header';
import applePayButton from './buttons/apple_pay_button.svg';
import googlePayButton from './buttons/google_pay_button.svg';
import mastercardButton from './buttons/mastercard_button.svg';

export default function Payment() {
  const changeScreen = useGame((state) => state.changeScreen);

  return (
    <div className="app">
      <Browser />
      <Header />
      <div className="page-content">
        <div className="form-text">Choose Payment Method</div>
        <img
          src={mastercardButton}
          className="payment-button"
          onClick={() => changeScreen('success')}
          alt="mastercard button"
        />
        <img
          src={applePayButton}
          className="payment-button"
          onClick={() => changeScreen('success')}
          alt="apple pay button"
        />
        <img
          src={googlePayButton}
          className="payment-button"
          onClick={() => changeScreen('success')}
          alt="google pay button"
        />
      </div>
    </div>
  );
}
