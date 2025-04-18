import useGame from '../../stores/useGame.js';
import browserIcon from './icons/browser.png';
import appStoreIcon from './icons/app_store.png';
import infoIcon from './icons/info.png';
import playIcon from './icons/google_play.png';

export default function Home() {
  const changeScreen = useGame((state) => state.changeScreen);

  return (
    <>
      <div className="screen-row">
        <img
          src={browserIcon}
          className="phone-icon"
          onClick={() => changeScreen('browser')}
          alt="browser icon"
        />
        <img
          src={appStoreIcon}
          className="phone-icon"
          onClick={() => window.open('', '_blank')}
          alt="app store icon"
        />
      </div>
      <div className="screen-row">
        <img
          src={infoIcon}
          className="phone-icon"
          onClick={() => window.open('', '_blank')}
          alt="info icon"
        />
        <img
          src={playIcon}
          className="phone-icon"
          onClick={() => window.open('', '_blank')}
          alt="google play icon"
        />
      </div>
    </>
  );
}
