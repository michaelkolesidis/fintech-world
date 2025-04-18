import Browser from './Browser';
import Header from './Header';
import tickIcon from './icons/tick.png';

export default function Success() {
  return (
    <div className="app">
      <Browser />
      <Header />
      <div className="page-content">
        <img className="fullscreen-icon" src={tickIcon} alt="tick icon" />
        <p className="page-message">Payment completed!</p>
      </div>
    </div>
  );
}
