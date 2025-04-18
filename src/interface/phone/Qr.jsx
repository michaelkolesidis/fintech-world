import Browser from './Browser';
import Header from './Header';
import scanQrIcon from './icons/scan_qr.png';

export default function Qr() {
  return (
    <div className="app">
      <Browser />
      <Header />
      <div className="page-content">
        <img className="fullscreen-icon" src={scanQrIcon} alt="scan qr icon" />
        <p className="page-message">Scan QR code to proceed</p>
      </div>
    </div>
  );
}
