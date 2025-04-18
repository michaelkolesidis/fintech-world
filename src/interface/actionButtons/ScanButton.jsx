import scanQrIcon from '../phone/icons/scan_qr.png';
import useGame from '../../stores/useGame.js';

export default function ScanButton() {
  const scanQr = useGame((state) => state.scanQr);
  const togglePhone = useGame((state) => state.togglePhone);
  const changeScreen = useGame((state) => state.changeScreen);

  const handleClick = () => {
    scanQr();
    togglePhone();
    changeScreen('browser');
  };

  return (
    <>
      <div className="action-button" onClick={handleClick}>
        <img className="button-icon" src={scanQrIcon} />
      </div>
    </>
  );
}
